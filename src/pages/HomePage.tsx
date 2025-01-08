import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskStore } from '../store/taskStore';
import { recommendedArticles, articleCategories } from '../data/dummyData';
import FloatingSearchBar from '../components/FloatingSearchBar';

// Add interface for Article
interface Article {
  id: string;
  title: string;
  date: string;
  thumbnail: string;
  items: string[];
}

const HomePage = () => {
  const navigate = useNavigate();
  const tasks = useTaskStore(state => state.tasks);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    name: string;
    coordinates: { lat: number; lng: number; }
  } | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const stats = {
    totalTasks: tasks.length,
    openTasks: tasks.filter(task => task.status === 'open').length,
    completedTasks: tasks.filter(task => task.status === 'completed').length
  };

  // Filter articles based on category and search term
  const filteredArticles = recommendedArticles.filter(article => 
    (selectedCategories.includes('All') || selectedCategories.includes(article.category)) &&
    (article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     article.items.some(item => item.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const RecommendedArticles = () => (
    <div style={{ marginTop: '30px' }}>
      <h2 style={{ 
        fontSize: '20px',
        marginBottom: '15px',
        color: '#333'
      }}>
        Recommended for You 📚
      </h2>

      <FloatingSearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onFilterClick={() => setShowFilters(true)}
        placeholder="🔍 Search articles..."
      />

      {/* Articles list with some top padding */}
      <div style={{ paddingTop: '20px' }}>
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            style={{
              backgroundColor: '#222',
              borderRadius: '12px',
              padding: '15px',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              transition: 'transform 0.2s',
              transform: 'translateY(0)',
              border: '2px solid #000080',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0,0,128,0.2)'
              }
            } as React.CSSProperties}
          >
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                fontSize: '32px',
                width: '60px',
                height: '60px',
                backgroundColor: '#333',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #000080'
              }}>
                {article.thumbnail}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ 
                  margin: '0 0 5px',
                  fontSize: '16px',
                  color: 'white'
                }}>
                  {article.title}
                </h3>
                <p style={{ 
                  margin: 0,
                  fontSize: '14px',
                  color: '#ccc'
                }}>
                  {article.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add FilterModal */}
      <FilterModal />
    </div>
  );

  // Add proper types to ArticleModal
  interface ArticleModalProps {
    article: Article;
    onClose: () => void;
  }

  const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '20px',
        width: '100%',
        maxWidth: '400px',
        maxHeight: '80vh',
        overflowY: 'auto',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            right: '20px',
            top: '20px',
            fontSize: '24px',
            background: 'none',
            border: 'none',
            color: '#333',
            cursor: 'pointer'
          }}
        >
          ✕
        </button>
        <h2 style={{ marginTop: '0' }}>{article.title}</h2>
        <p style={{ color: '#666' }}>{article.date}</p>
        <ul style={{ 
          paddingLeft: '20px',
          marginTop: '20px'
        }}>
          {article.items.map((item: string, index: number) => (
            <li key={index} style={{ 
              marginBottom: '10px',
              color: '#333'
            }}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  // Add map modal component
  const MapModal = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      display: showMap ? 'flex' : 'none',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      {/* Add map component here */}
      <button onClick={() => setShowMap(false)}>Close Map</button>
    </div>
  );

  // Add FilterModal component
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
        <h3 style={{ color: 'white', marginBottom: '15px' }}>Article Categories (Select multiple)</h3>
        
        {/* Categories with multiple selection */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <button
              onClick={() => {
                setSelectedCategories(['All']);
              }}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: selectedCategories.includes('All') ? '#007AFF' : '#333',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              All
            </button>
            {articleCategories.map(category => (
              <button
                key={category}
                onClick={() => {
                  if (category === 'All') {
                    setSelectedCategories(['All']);
                  } else {
                    setSelectedCategories(prev => {
                      const newSelection = prev.filter(cat => cat !== 'All');
                      if (prev.includes(category)) {
                        const result = newSelection.filter(cat => cat !== category);
                        return result.length === 0 ? ['All'] : result;
                      } else {
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
                  cursor: 'pointer'
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

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

  // Update the style tag
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }

    .hide-scrollbar {
      scrollbar-width: none;
      -ms-overflow-style: none;
      -webkit-overflow-scrolling: touch;
    }

    .category-scroll {
      -webkit-overflow-scrolling: touch;
      scroll-behavior: smooth;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .category-scroll::-webkit-scrollbar {
      display: none;
    }
  `;
  document.head.appendChild(styleSheet);

  return (
    <div style={{
      height: 'calc(100vh - 120px)',
      overflowY: 'auto',
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
      WebkitOverflowScrolling: 'touch'
    }} className="hide-scrollbar">
      {/* Welcome Section */}
      <div style={{
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '24px',
          marginBottom: '10px'
        }}>
          Welcome to Here4Help! 👋
        </h1>
        <p style={{ color: '#666' }}>
          Connect with people who need your help or post your own task.
        </p>
      </div>

      {/* Quick Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '15px',
        marginBottom: '30px'
      }}>
        <div style={{
          backgroundColor: '#fff',
          padding: '15px',
          borderRadius: '10px',
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '5px' }}>📊</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{stats.totalTasks}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Total Tasks</div>
        </div>
        <div style={{
          backgroundColor: '#fff',
          padding: '15px',
          borderRadius: '10px',
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '5px' }}>🔓</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{stats.openTasks}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Open Tasks</div>
        </div>
        <div style={{
          backgroundColor: '#fff',
          padding: '15px',
          borderRadius: '10px',
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '5px' }}>✅</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{stats.completedTasks}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Completed</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <button
          onClick={() => navigate('/tasks')}
          style={{
            padding: '15px',
            backgroundColor: '#007AFF',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '16px'
          }}
        >
          <span>Browse Available Tasks</span>
          <span>→</span>
        </button>
        <button
          onClick={() => navigate('/post')}
          style={{
            padding: '15px',
            backgroundColor: '#fff',
            color: '#333',
            border: '1px solid #ddd',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '16px'
          }}
        >
          <span>Post a New Task</span>
          <span>→</span>
        </button>
      </div>

      {/* Add the new Recommended Articles section */}
      <RecommendedArticles />

      {/* Add the modal */}
      {selectedArticle && (
        <ArticleModal 
          article={selectedArticle} 
          onClose={() => setSelectedArticle(null)}
        />
      )}

      <MapModal />
    </div>
  );
};

export default HomePage; 