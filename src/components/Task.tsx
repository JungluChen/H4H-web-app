import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskStore } from '../store/taskStore';
import { Task as TaskType } from '../types';

interface TaskProps {
  task: TaskType;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const navigate = useNavigate();
  const addChat = useTaskStore(state => state.addChat);

  const handleContactClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newChat = {
      id: String(Date.now()),
      sender: task.postedBy,
      taskTitle: task.title,
      message: task.description,
      timestamp: new Date().toLocaleTimeString(),
      language: task.language,
      unreadCount: 1
    };
    
    const { createdChat } = addChat(newChat);
    
    // Navigate directly to chat view with the chat
    navigate('/chat', { state: { initialChat: createdChat } });
  };

  return (
    <div 
      onClick={() => navigate(`/task/${task.id}`)}
      style={{
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '15px',
        marginBottom: '10px',
        cursor: 'pointer',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}
    >
      <div style={{ marginBottom: '10px' }}>
        <h3 style={{ margin: '0 0 5px 0' }}>{task.title}</h3>
        <p style={{ margin: '0', color: '#666' }}>{task.description}</p>
      </div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '10px'
      }}>
        <div style={{ color: '#666' }}>
          💰 {task.price} NTD
        </div>
        <button
          onClick={handleContactClick}
          style={{
            backgroundColor: '#007AFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            padding: '8px 15px',
            cursor: 'pointer'
          }}
        >
          Contact Now
        </button>
      </div>
    </div>
  );
};

export default Task; 