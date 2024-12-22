import React, { useState, CSSProperties } from 'react';
import { useTaskStore } from '../store/taskStore';
import DemoDisclaimer from '../components/DemoDisclaimer';
import TaskDetails from '../components/TaskDetails';
import { Task } from '../types';

const categories = ['All', 'Finance', 'Telecom', 'Education', 'Transport'];

// Add this style to hide scrollbars
const hideScrollbarStyle: CSSProperties = {
  display: 'flex', 
  gap: '10px', 
  overflowX: 'auto' as const,
  marginBottom: '20px',
  padding: '5px 0',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  WebkitOverflowScrolling: 'touch',
};

// Add a style tag to handle webkit scrollbar
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
`;
document.head.appendChild(styleSheet);

const TaskBrowsing = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const chats = useTaskStore((state) => state.chats);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const filteredTasks = tasks.filter((task: Task) => 
    (selectedCategory === 'All' || task.category === selectedCategory) &&
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

  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <DemoDisclaimer />
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="🔍 Search tasks..."
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #333',
            backgroundColor: '#222',
            color: 'white'
          }}
        />
      </div>

      <div 
        className="hide-scrollbar"
        style={hideScrollbarStyle}
      >
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: selectedCategory === category ? '#007AFF' : '#333',
              color: 'white',
              whiteSpace: 'nowrap'
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <div style={{ 
        height: '1px', 
        backgroundColor: '#333', 
        margin: '20px 0',
        opacity: 0.5 
      }} />

      <div 
        className="hide-scrollbar"
        style={{
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 250px)',
          paddingBottom: '80px',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {sortedTasks.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '20px', 
            color: '#999' 
          }}>
            No tasks found 😢
          </div>
        ) : (
          sortedTasks.map((task) => (
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
                <h3 style={{ margin: 0 }}>{task.title}</h3>
                <span style={{ color: '#FFD700' }}>💰 ${task.price}</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', margin: '10px 0', color: '#999' }}>
                <span>📂 {task.category}</span>
                <span>⏰ {task.time}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>📍 {task.location}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span>{task.language}</span>
                  {task.flag === 'us' ? '🇺🇸' : task.flag === 'jp' ? '🇯🇵' : '🌐'}
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
            </div>
          ))
        )}
      </div>

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