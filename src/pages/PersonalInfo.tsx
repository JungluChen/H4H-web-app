import React from 'react';
import { useNavigate } from 'react-router-dom';
import { dummyProfile } from '../data/dummyData';
import DemoDisclaimer from '../components/DemoDisclaimer';

const PersonalInfo = () => {
  const navigate = useNavigate();
  const menuItems = [
    { title: 'Personal Information', icon: '👤' },
    { title: 'My Wallet', icon: '💰', amount: '6000$' },
    { title: 'My Following', icon: '👥' },
    { title: 'Task History', icon: '📋' },
    { title: 'Ratings and Feedback', icon: '⭐' },
    { title: 'Task Analysis & Reports', icon: '📊' },
    { title: 'Security Settings', icon: '🔒' },
    { title: 'Contact Customer Support', icon: '💬' }
  ];

  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <DemoDisclaimer />

      <div style={{
        backgroundColor: '#222',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#333',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px'
        }}>
          👤
        </div>
        <div>
          <h3 style={{ margin: 0 }}>{dummyProfile.name}</h3>
          <p style={{ margin: '5px 0', color: '#999' }}>Rating: {'⭐'.repeat(Math.floor(dummyProfile.rating))}</p>
        </div>
      </div>

      {menuItems.map((item, index) => (
        <div
          key={index}
          onClick={() => item.title === 'My Wallet' && navigate('/achievements')}
          style={{
            backgroundColor: '#222',
            padding: '15px',
            marginBottom: '10px',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>{item.icon}</span>
            <span>{item.title}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {item.amount && <span style={{ color: '#FFD700' }}>{item.amount}</span>}
            <span>›</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PersonalInfo; 