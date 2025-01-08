import React from 'react';
import { dummyAchievements } from '../data/dummyData';

const achievementIcons = {
  'Promotion Master': '🌟',
  'Curious Explorer': '🔍',
  'Task Expert': '👑',
  'Task Designer': '✍️',
  'Life Planner': '📅'
};

const Achievements = () => {
  const totalAmount = dummyAchievements.reduce((sum, ach) => sum + (ach.reward * ach.progress / 100), 0);
  const totalAchievements = dummyAchievements.length;
  const completedAchievements = dummyAchievements.filter(ach => ach.progress === 100).length;

  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <div style={{ 
        backgroundColor: '#222',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '24px', color: '#FFD700' }}>💰 ${totalAmount.toFixed(2)}</div>
      </div>

      <div style={{
        backgroundColor: '#222',
        padding: '15px',
        borderRadius: '10px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-around',
        textAlign: 'center'
      }}>
        <div>
          <div style={{ fontSize: '24px', marginBottom: '5px' }}>🏆</div>
          <div style={{ color: '#999', fontSize: '14px' }}>
            {completedAchievements}/{totalAchievements} Completed
          </div>
        </div>
        <div>
          <div style={{ fontSize: '24px', marginBottom: '5px' }}>⭐</div>
          <div style={{ color: '#999', fontSize: '14px' }}>Level {Math.floor(totalAmount / 1000) + 1}</div>
        </div>
        <div>
          <div style={{ fontSize: '24px', marginBottom: '5px' }}>📈</div>
          <div style={{ color: '#999', fontSize: '14px' }}>
            {Math.floor((completedAchievements / totalAchievements) * 100)}% Progress
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '15px' }}>Your Achievements</h3>
        {dummyAchievements.map((achievement, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#222',
              padding: '15px',
              marginBottom: '15px',
              borderRadius: '10px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div>
                <span style={{ marginRight: '10px', fontSize: '20px' }}>
                  {achievementIcons[achievement.title as keyof typeof achievementIcons]}
                </span>
                <span>{achievement.title}</span>
              </div>
              <div>
                <span style={{ color: '#FFD700' }}>💰 ${achievement.reward}</span>
                <span style={{ color: '#666', marginLeft: '10px' }}>
                  (${(achievement.reward * achievement.progress / 100).toFixed(2)} earned)
                </span>
              </div>
            </div>
            <p style={{ margin: '5px 0', fontSize: '14px', color: '#999' }}>
              {achievement.description}
            </p>
            <div style={{ 
              backgroundColor: '#333',
              borderRadius: '10px',
              height: '10px',
              marginTop: '10px'
            }}>
              <div style={{
                width: `${achievement.progress}%`,
                height: '100%',
                backgroundColor: '#007AFF',
                borderRadius: '10px'
              }} />
            </div>
            <div style={{ textAlign: 'right', fontSize: '12px', marginTop: '5px' }}>
              {achievement.progress}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements; 