import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/achievements', icon: '🏆', label: 'Awards', name: 'Achievement Board' },
    { path: '/tasks', icon: '📋', label: 'Tasks', name: 'Task Browsing' },
    { path: '/post', icon: '✏️', label: 'Post', name: 'Post Task' },
    { path: '/chat', icon: '💬', label: 'Chat', name: 'Chat Room' },
    { path: '/profile', icon: '👤', label: 'Profile', name: 'Personal Info' }
  ];

  const iconStyle = {
    fontSize: '32px',
    marginBottom: '2px'
  };

  const labelStyle = {
    fontSize: '11px',
    marginTop: '2px',
    textAlign: 'center' as const,
    lineHeight: 1.2
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '75px',
      backgroundColor: '#fff',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderTop: '1px solid #eee',
      maxWidth: '430px',
      margin: '0 auto',
      boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
      padding: '0 10px'
    }}>
      {navItems.map(item => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          style={{
            background: 'none',
            border: 'none',
            color: isActive(item.path) ? '#007AFF' : '#666',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '70px',
            padding: '5px 0'
          }}
        >
          <span style={iconStyle}>{item.icon}</span>
          <span style={labelStyle}>
            {item.name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default BottomNavigation; 