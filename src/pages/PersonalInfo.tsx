import React from 'react';
import { useTaskStore } from '../store/taskStore';

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  reward: number;
  icon: string;
}

interface Task {
  id: string;
  title: string;
  status: string;
  price: number;
}

const PersonalInfo = () => {
  const profile = useTaskStore(state => state.profile);

  return (
    <div style={{ 
      padding: '20px',
      color: '#333',
      backgroundColor: '#f5f5f5'
    }}>
      {/* Profile Header */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '15px',
        padding: '20px',
        marginBottom: '20px',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <div style={{ 
          width: '80px',
          height: '80px',
          borderRadius: '40px',
          backgroundColor: '#007AFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 15px',
          fontSize: '32px'
        }}>
          👤
        </div>
        <h2 style={{ margin: '0 0 5px' }}>{profile.name}</h2>
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
          color: '#666'
        }}>
          ⭐ {profile.rating.toFixed(1)} Rating
        </div>
      </div>

      {/* Wallet Section */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '15px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <h3 style={{ margin: '0 0 15px' }}>Wallet</h3>
        <div style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#007AFF'
        }}>
          ${profile.wallet}
        </div>
      </div>

      {/* Achievements Section */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '15px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <h3 style={{ margin: '0 0 15px' }}>Recent Achievements</h3>
        {profile.achievements.slice(0, 3).map((achievement: Achievement, index: number) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: index < 2 ? '15px' : 0
            }}
          >
            <span style={{ fontSize: '24px' }}>{achievement.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 'bold' }}>{achievement.title}</div>
              <div style={{ fontSize: '14px', color: '#666' }}>{achievement.description}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Task History Preview */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '15px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <h3 style={{ margin: '0 0 15px' }}>Recent Tasks</h3>
        {profile.taskHistory.slice(0, 3).map((task: Task, index: number) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: index < 2 ? '15px' : 0
            }}
          >
            <span style={{ fontSize: '24px' }}>📋</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 'bold' }}>{task.title}</div>
              <div style={{ fontSize: '14px', color: '#666' }}>{task.status}</div>
            </div>
            <div style={{ color: '#FFD700' }}>${task.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalInfo; 