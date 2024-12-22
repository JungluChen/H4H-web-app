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
      height: '60px',
      backgroundColor: '#000',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderTop: '1px solid #333'
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