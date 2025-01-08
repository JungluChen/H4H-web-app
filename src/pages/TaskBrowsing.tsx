import React, { useState, CSSProperties, useEffect } from 'react';
import { useTaskStore } from '../store/taskStore';
import TaskDetails from '../components/TaskDetails';
import { Task } from '../types';
import FloatingSearchBar from '../components/FloatingSearchBar';

const categories = [
  'All',
  'Finance',
  'Telecom',
  'Education',
  'Transport',
  'Shopping',
  'Food',
  'Healthcare',
  'Housing',
  'Government',
  'Entertainment',
  'Sports',
  'Technology',
  'Language',
  'Other'
];

// Add this style to hide scrollbars
const hideScrollbarStyle: CSSProperties = {
  height: '100%',
  overflowY: 'auto',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  WebkitOverflowScrolling: 'touch',
};

// Add a style tag to handle webkit scrollbar
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  .hide-scrollbar::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }

  .hide-scrollbar {
    scrollbar-width: none;
    -ms-overflow-style: none;
    -webkit-overflow-scrolling: touch;
  }

  .task-list-container {
    height: 100%;
    overflow-y: auto;
    padding-bottom: 80px;
  }

  .task-list-container::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;
document.head.appendChild(styleSheet);

const TaskBrowsing = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const chats = useTaskStore((state) => state.chats);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [sortBy, setSortBy] = useState<'distance' | 'price' | 'language' | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Get user's location when component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to Taipei Main Station if location access is denied
          setUserLocation({ lat: 25.0478, lng: 121.5170 });
        }
      );
    }
  }, []);

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
  };

  const filteredTasks = tasks.filter((task: Task) => 
    (selectedCategories.includes('All') || selectedCategories.includes(task.category)) &&
    (task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     task.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
     task.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Function to check if we have contacted this task's poster
  const hasContactedPoster = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return false;
    
    return chats.some(chat => 
      chat.sender === task.postedBy && 
      chat.taskTitle === task.title
    );
  };

  // Sort tasks: contacted tasks go to bottom
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const aContacted = hasContactedPoster(a.id);
    const bContacted = hasContactedPoster(b.id);
    
    if (aContacted && !bContacted) return 1;
    if (!aContacted && bContacted) return -1;
    return 0;
  });

  // Add sorting controls
  const SortingControls = () => (
    <div style={{
      display: 'flex',
      gap: '10px',
      marginBottom: '15px',
      padding: '10px 0'
    }}>
      <select
        value={sortBy || ''}
        onChange={(e) => setSortBy(e.target.value as any)}
        style={{
          padding: '8px',
          borderRadius: '5px',
          border: '1px solid #ddd',
          backgroundColor: '#fff',
          color: '#333',
          cursor: 'pointer'
        }}
      >
        <option value="">Sort by...</option>
        <option value="distance">Distance</option>
        <option value="price">Price</option>
        <option value="language">Language</option>
      </select>

      <button
        onClick={() => setSortOrder(order => order === 'asc' ? 'desc' : 'asc')}
        style={{
          padding: '8px 12px',
          borderRadius: '5px',
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          color: '#333',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}
      >
        {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
      </button>
    </div>
  );

  // Sort tasks based on selected criteria
  const getSortedTasks = (tasks: Task[]) => {
    if (!sortBy) return tasks;

    return [...tasks].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'distance':
          if (userLocation) {
            const distA = calculateDistance(
              userLocation.lat,
              userLocation.lng,
              a.coordinates.lat,
              a.coordinates.lng
            );
            const distB = calculateDistance(
              userLocation.lat,
              userLocation.lng,
              b.coordinates.lat,
              b.coordinates.lng
            );
            comparison = distA - distB;
          }
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'language':
          comparison = a.language.localeCompare(b.language);
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });
  };

  // Apply sorting to filtered tasks
  const sortedAndFilteredTasks = getSortedTasks(sortedTasks);

  // In the task card display, add distance information
  const renderDistance = (task: Task) => {
    if (!userLocation) return null;
    
    const distance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      task.coordinates.lat,
      task.coordinates.lng
    );

    return (
      <span style={{ fontSize: '12px', color: '#999' }}>
        {distance.toFixed(1)} km away
      </span>
    );
  };

  // Create a Filter Modal component
  const FilterModal = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: showFilters ? 'flex' : 'none',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#222',
        padding: '20px',
        borderRadius: '10px',
        width: '90%',
        maxWidth: '400px',
        maxHeight: '80vh',
        overflowY: 'auto'
      }}>
        <h3 style={{ color: 'white', marginBottom: '15px' }}>Filters</h3>
        
        {/* Categories with multiple selection */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ color: 'white', display: 'block', marginBottom: '10px' }}>Categories (Select multiple)</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => {
                  if (category === 'All') {
                    // If 'All' is clicked, clear other selections
                    setSelectedCategories(['All']);
                  } else {
                    setSelectedCategories(prev => {
                      // Remove 'All' when selecting specific categories
                      const newSelection = prev.filter(cat => cat !== 'All');
                      
                      if (prev.includes(category)) {
                        // If category is already selected, remove it
                        const result = newSelection.filter(cat => cat !== category);
                        // If no categories left, select 'All'
                        return result.length === 0 ? ['All'] : result;
                      } else {
                        // Add the category
                        return [...newSelection, category];
                      }
                    });
                  }
                }}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: 'none',
                  backgroundColor: selectedCategories.includes(category) ? '#007AFF' : '#333',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                {selectedCategories.includes(category) && '✓'} {category}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ color: 'white', display: 'block', marginBottom: '10px' }}>Sort By</label>
          <select
            value={sortBy || ''}
            onChange={(e) => setSortBy(e.target.value as any)}
            style={{
              width: '100%',
              padding: '8px',
              backgroundColor: '#333',
              color: 'white',
              border: '1px solid #444',
              borderRadius: '5px'
            }}
          >
            <option value="">None</option>
            <option value="distance">Distance</option>
            <option value="price">Price</option>
            <option value="language">Language</option>
          </select>
        </div>

        {/* Sort Order */}
        <button
          onClick={() => setSortOrder(order => order === 'asc' ? 'desc' : 'asc')}
          style={{
            width: '100%',
            padding: '8px',
            backgroundColor: '#333',
            border: '1px solid #444',
            borderRadius: '5px',
            color: 'white',
            marginBottom: '20px'
          }}
        >
          {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
        </button>

        {/* Close Button */}
        <button
          onClick={() => setShowFilters(false)}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007AFF',
            border: 'none',
            borderRadius: '5px',
            color: 'white'
          }}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ 
      height: 'calc(100vh - 120px)',
      padding: '20px',
      color: '#333',
      backgroundColor: '#f5f5f5',
      overflowY: 'auto'
    }} className="hide-scrollbar">
      <FloatingSearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onFilterClick={() => setShowFilters(true)}
        placeholder="🔍 Search tasks..."
      />

      {/* Task List */}
      <div style={{ paddingTop: '20px' }}>
        {sortedAndFilteredTasks.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '20px', 
            color: '#999' 
          }}>
            No tasks found 😢
          </div>
        ) : (
          sortedAndFilteredTasks.map((task) => (
            <div 
              key={task.id}
              onClick={() => setSelectedTask(task)}
              style={{
                backgroundColor: '#222',
                borderRadius: '10px',
                padding: '15px',
                marginBottom: '15px',
                cursor: 'pointer',
                opacity: hasContactedPoster(task.id) ? 0.6 : 1,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ 
                  margin: 0,
                  color: 'white'
                }}>
                  {task.title}
                </h3>
                <span style={{ color: '#FFD700' }}>💰 ${task.price}</span>
              </div>
              <div style={{ 
                display: 'flex', 
                gap: '10px', 
                margin: '10px 0', 
                color: '#999'
              }}>
                <span>📂 {task.category}</span>
                <span>⏰ {task.time}</span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                color: '#fff'
              }}>
                <span>📍 {task.location}</span>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '5px',
                  color: '#fff'
                }}>
                  <span>{task.language}</span>
                </div>
              </div>
              {hasContactedPoster(task.id) && (
                <div style={{
                  backgroundColor: '#007AFF',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  marginTop: '8px'
                }}>
                  ✓ Contacted
                </div>
              )}
              {renderDistance(task)}
            </div>
          ))
        )}
      </div>

      {/* Filter Modal */}
      <FilterModal />

      {/* Task Details Modal */}
      {selectedTask && (
        <TaskDetails
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
};

export default TaskBrowsing; 