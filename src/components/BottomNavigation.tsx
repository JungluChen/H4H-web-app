import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '60px',
      backgroundColor: '#222',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderTop: '1px solid #333',
      maxWidth: '430px',
      margin: '0 auto'
    }}>
      <button
        onClick={() => navigate('/achievements')}
        style={{
          background: 'none',
          border: 'none',
          color: isActive('/achievements') ? '#007AFF' : 'white',
          fontSize: '24px',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        🏆
        <span style={{ fontSize: '12px', marginTop: '4px' }}>Achievements</span>
      </button>

      <button
        onClick={() => navigate('/tasks')}
        style={{
          background: 'none',
          border: 'none',
          color: isActive('/tasks') ? '#007AFF' : 'white',
          fontSize: '24px',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        📋
        <span style={{ fontSize: '12px', marginTop: '4px' }}>Tasks</span>
      </button>

      <button
        onClick={() => navigate('/post')}
        style={{
          background: 'none',
          border: 'none',
          color: isActive('/post') ? '#007AFF' : 'white',
          fontSize: '24px',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        ✏️
        <span style={{ fontSize: '12px', marginTop: '4px' }}>Post</span>
      </button>

      <button
        onClick={() => navigate('/chat')}
        style={{
          background: 'none',
          border: 'none',
          color: isActive('/chat') ? '#007AFF' : 'white',
          fontSize: '24px',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        💬
        <span style={{ fontSize: '12px', marginTop: '4px' }}>Chat</span>
      </button>
    </div>
  );
};

export default BottomNavigation; 