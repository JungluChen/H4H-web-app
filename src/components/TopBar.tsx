import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#111',
      borderBottom: '1px solid #333',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <button 
          onClick={() => navigate('/')}
          style={{ 
            backgroundColor: location.pathname === '/' ? '#FFD700' : 'transparent',
            padding: '8px',
            borderRadius: '5px'
          }}
        >
          🏠
        </button>
      </div>
      <div style={{ 
        fontWeight: 'bold',
        color: 'white'
      }}>
        Here4Help
      </div>
      <button 
        onClick={() => navigate('/profile')}
        style={{ 
          backgroundColor: location.pathname === '/profile' ? '#FFD700' : 'transparent',
          padding: '8px',
          borderRadius: '5px'
        }}
      >
        👤
      </button>
    </div>
  );
};

export default TopBar; 