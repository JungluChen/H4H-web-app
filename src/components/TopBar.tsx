import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const shouldShowBack = !['/tasks', '/chat', '/post', '/profile', '/achievements', '/'].includes(location.pathname);

  return (
    <div style={{
      backgroundColor: '#fff',
      padding: '15px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #eee',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ width: '40px' }}>
        {shouldShowBack && (
          <button
            onClick={() => navigate(-1)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              color: '#333',
              cursor: 'pointer',
              padding: '5px'
            }}
          >
            ←
          </button>
        )}
        {!shouldShowBack && (
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              color: '#333',
              cursor: 'pointer',
              padding: '5px'
            }}
          >
            🏠
          </button>
        )}
      </div>

      <div style={{ 
        flex: 1,
        textAlign: 'center'
      }}>
        <span style={{ 
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#333'
        }}>
          Here4Help
        </span>
      </div>

      <div style={{ width: '40px' }}>
        <button
          onClick={() => navigate('/profile')}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '24px',
            color: '#333',
            cursor: 'pointer',
            padding: '5px'
          }}
        >
          👤
        </button>
      </div>
    </div>
  );
};

export default TopBar; 