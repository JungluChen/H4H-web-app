import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      width: '100%',
      maxWidth: '430px',
      backgroundColor: '#f0f0f0',
      display: 'flex',
      justifyContent: 'space-around',
      padding: '10px 0',
      zIndex: 1000,
      borderTop: '1px solid #000080'
    }}>
      <button 
        onClick={() => navigate('/achievements')}
        className={location.pathname === '/achievements' ? 'active' : ''}
      >
        🏆
      </button>
      <button 
        onClick={() => navigate('/tasks')}
        className={location.pathname === '/tasks' ? 'active' : ''}
      >
        🔍
      </button>
      <button 
        onClick={() => navigate('/post')}
        className={location.pathname === '/post' ? 'active' : ''}
      >
        ✍️
      </button>
      <button 
        onClick={() => navigate('/chat')}
        className={location.pathname === '/chat' ? 'active' : ''}
      >
        💬
      </button>
    </div>
  );
};

export default Navigation; 