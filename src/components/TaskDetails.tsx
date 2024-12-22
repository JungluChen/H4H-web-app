import React from 'react';
import { Task } from '../types';
import { useNavigate } from 'react-router-dom';
import { useTaskStore } from '../store/taskStore';

interface TaskDetailsProps {
  task: Task;
  onClose: () => void;
}

const TaskDetails = ({ task, onClose }: TaskDetailsProps) => {
  const navigate = useNavigate();
  const addChat = useTaskStore(state => state.addChat);

  const handleContactClick = () => {
    const chats = useTaskStore.getState().chats;
    
    // Check if a chat for this task already exists
    const existingChat = chats.find(chat => 
      chat.sender === task.postedBy && 
      chat.taskTitle === task.title
    );

    if (existingChat) {
      // If chat exists, just navigate to it
      onClose();
      navigate('/chat', { state: { initialChat: existingChat } });
      return;
    }

    // If no existing chat, create a new one
    const newChat = {
      id: `chat-${Date.now()}`,
      sender: task.postedBy,
      taskTitle: task.title,
      message: `Hi, I'm interested in helping with "${task.title}"`,
      timestamp: new Date().toLocaleTimeString(),
      unreadCount: 1
    };

    // Add the chat to the store
    addChat(newChat);

    // Close the task details modal
    onClose();

    // Navigate to chat room and initialize the chat immediately
    navigate('/chat', { state: { initialChat: newChat } });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#222',
        borderRadius: '10px',
        padding: '20px',
        width: '100%',
        maxWidth: '400px',
        maxHeight: '80vh',
        overflowY: 'auto',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            right: '10px',
            top: '10px',
            fontSize: '20px',
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          ✕
        </button>

        <h2 style={{ marginTop: '0', color: 'white' }}>{task.title}</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <div style={{ color: '#FFD700', fontSize: '24px', marginBottom: '10px' }}>
            💰 ${task.price}
          </div>
          <div style={{ color: '#999', marginBottom: '5px' }}>
            📂 Category: {task.category}
          </div>
          <div style={{ color: '#999', marginBottom: '5px' }}>
            ⏰ Time: {task.time}
          </div>
          <div style={{ color: '#999', marginBottom: '5px' }}>
            📍 Location: {task.location}
          </div>
          <div style={{ color: '#999', marginBottom: '5px' }}>
            👤 Posted by: {task.postedBy}
          </div>
          <div style={{ color: '#999', marginBottom: '5px' }}>
            🌐 Language: {task.language} {task.flag === 'us' ? '🇺🇸' : task.flag === 'jp' ? '🇯🇵' : '🌐'}
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'white', marginBottom: '10px' }}>Description</h3>
          <p style={{ color: '#999' }}>{task.description || 'No description provided.'}</p>
        </div>

        <button
          onClick={handleContactClick}
          style={{
            width: '100%',
            padding: '15px',
            backgroundColor: '#007AFF',
            border: 'none',
            borderRadius: '5px',
            color: 'white',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Contact Task Poster 💬
        </button>
      </div>
    </div>
  );
};

export default TaskDetails; 