import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Task, Chat } from '../types';
import { useTaskStore } from '../store/taskStore';

interface TaskDetailsProps {
  task: Task;
  onClose: () => void;
}

const TaskDetails = ({ task, onClose }: TaskDetailsProps) => {
  const navigate = useNavigate();
  const addChat = useTaskStore(state => state.addChat);

  const formatTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleChat = () => {
    const newChat: Chat = {
      id: String(Date.now()),
      sender: task.postedBy,
      taskTitle: task.title,
      message: task.description,
      timestamp: formatTime(new Date()),
      language: task.language,
      unreadCount: 0
    };
    
    const { createdChat } = addChat(newChat);
    
    // Close the dialog and navigate to chat
    onClose();
    navigate('/chat', { state: { initialChat: createdChat, isNewChat: true } });
  };

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      maxWidth: '90%',
      width: '400px',
      maxHeight: '90vh',
      overflowY: 'auto',
      zIndex: 1000
    }}>
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          right: '10px',
          top: '10px',
          fontSize: '20px',
          color: '#666',
          padding: '5px',
          background: 'none',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        ✕
      </button>

      <h2 style={{ margin: '0 0 15px 0', paddingRight: '30px' }}>{task.title}</h2>
      <p style={{ margin: '0 0 10px 0', color: '#666' }}>{task.description}</p>
      
      <div style={{ marginBottom: '15px' }}>
        <div>💰 {task.price} NTD</div>
        <div>🕒 {task.time}</div>
        <div>📍 {task.location}</div>
        <div>👤 {task.postedBy}</div>
        <div>🌐 {task.language}</div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px'
      }}>
        <button
          onClick={handleChat}
          style={{
            padding: '10px 30px',
            backgroundColor: '#007AFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Contact Now
        </button>
      </div>
    </div>
  );
};

export default TaskDetails; 