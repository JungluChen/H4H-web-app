import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTaskStore } from '../store/taskStore';
import { useLocation } from 'react-router-dom';
import { Chat } from '../types';
import FloatingSearchBar from '../components/FloatingSearchBar';

const ChatRoom = () => {
  const location = useLocation();
  const chats = useTaskStore(state => state.chats);
  const readMessages = useTaskStore(state => state.readMessages);
  const markChatAsRead = useTaskStore(state => state.markChatAsRead);
  const [selectedChat, setSelectedChat] = useState<typeof chats[0] | null>(null);
  const chatMessages = useTaskStore(state => state.chatMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const addMessage = useTaskStore(state => state.addMessage);

  const initializeChat = useCallback((chat: typeof chats[0]) => {
    setSelectedChat(chat);
    
    if (!readMessages.includes(chat.id)) {
      markChatAsRead(chat.id);
    }
  }, [readMessages, markChatAsRead]);

  // Add reply variations
  const replyVariations = {
    initial: [
      "Thanks for offering to help! Could you tell me more about your experience?",
      "That would be great! Have you done this before?",
      "Perfect timing! What's your availability like?",
      "Thanks! Could you share your preferred meeting location?",
      "Awesome! Do you speak Chinese as well?",
      "Great! How long do you think it will take?"
    ],
    phoneSetup: [
      "Yes, I'm available after 2 PM. Where should we meet?",
      "That works! Do you know which carrier is best?",
      "Perfect! Do you recommend any specific phone plans?",
      "Great! Could you help with translation at the store?"
    ],
    bankAccount: [
      "That would be great! What time works best for you?",
      "Perfect! Do you know which documents I need to bring?",
      "Sounds good! Have you helped others with this before?",
      "Thanks! Is there a specific branch you recommend?"
    ]
  };

  useEffect(() => {
    const state = location.state as { initialChat?: typeof chats[0] };
    if (state?.initialChat) {
      initializeChat(state.initialChat);
    }
  }, [location, initializeChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat && chatMessages[selectedChat.id]]);

  const formatTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    const currentTime = formatTime(new Date());
    const message: Chat = {
      id: Date.now().toString(),
      message: newMessage,
      sender: 'You',
      timestamp: currentTime,
      taskTitle: selectedChat.taskTitle,
      language: selectedChat.language,
      unreadCount: 0
    };

    // Add message to store
    addMessage(selectedChat.id, message);
    
    // Clear input
    setNewMessage('');
  };

  // Filter chats based on search term
  const filteredChats = chats.filter(chat => 
    chat.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.taskTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Reset states when leaving chat view
  const handleBackClick = () => {
    setSelectedChat(null);
  };

  if (selectedChat) {
    // Individual Chat View
    return (
      <div className="chat-view" style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f5f5f5',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        maxWidth: '430px',
        margin: '0 auto',
        zIndex: 1000
      }}>
        {/* Action Bar */}
        <div style={{
          padding: '15px 20px',
          backgroundColor: '#fff',
          borderBottom: '1px solid #eee',
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          position: 'sticky',
          top: 0,
          zIndex: 1001,
          width: '100%'
        }}>
          <button
            onClick={handleBackClick}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '5px',
              color: '#333'
            }}
          >
            ←
          </button>
          <div>
            <div style={{ fontWeight: 'bold' }}>{selectedChat.sender}</div>
            <div style={{ fontSize: '14px', color: '#666' }}>{selectedChat.taskTitle}</div>
          </div>
        </div>

        {/* Messages Area */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          marginBottom: '80px',
          backgroundColor: '#f5f5f5'
        }} className="hide-scrollbar">
          {selectedChat && chatMessages[selectedChat.id]?.map((msg) => (
            <div
              key={msg.id}
              style={{
                marginBottom: '15px',
                display: 'flex',
                justifyContent: msg.sender === 'You' ? 'flex-end' : 'flex-start'
              }}
            >
              <div style={{
                maxWidth: '70%',
                backgroundColor: msg.sender === 'You' ? '#007AFF' : '#fff',
                color: msg.sender === 'You' ? '#fff' : '#333',
                padding: '10px 15px',
                borderRadius: '18px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
              }}>
                <div>{msg.message}</div>
                <div style={{
                  fontSize: '12px',
                  opacity: 0.7,
                  marginTop: '5px'
                }}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Fixed Message Input at Bottom */}
        <form
          onSubmit={handleSendMessage}
          style={{
            padding: '15px 20px',
            backgroundColor: '#fff',
            borderTop: '1px solid #eee',
            display: 'flex',
            gap: '10px',
            position: 'fixed',
            bottom: '60px',
            left: 0,
            right: 0,
            zIndex: 1001,
            maxWidth: '430px',
            margin: '0 auto',
            boxSizing: 'border-box'
          }}
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '20px',
              border: '1px solid #ddd',
              fontSize: '16px'
            }}
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007AFF',
              color: '#fff',
              border: 'none',
              borderRadius: '20px',
              fontSize: '16px',
              cursor: 'pointer',
              opacity: newMessage.trim() ? 1 : 0.5
            }}
          >
            Send
          </button>
        </form>
      </div>
    );
  }

  // DM List View
  return (
    <div className="dm-list" style={{ 
      height: '100vh', 
      backgroundColor: '#f5f5f5',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      maxWidth: '430px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Search Bar */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        backgroundColor: '#f5f5f5',
        padding: '15px'
      }}>
        <FloatingSearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="🔍 Search messages..."
        />
      </div>

      {/* DM List */}
      <div style={{ 
        padding: '0 15px',
        flex: 1,
        overflowY: 'auto',
        paddingBottom: '80px'
      }} className="hide-scrollbar">
        {filteredChats.length === 0 ? (
          <div style={{
            textAlign: 'center',
            color: '#666',
            marginTop: '40px',
            padding: '20px'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>💬</div>
            <div>No messages yet</div>
            <div style={{ fontSize: '14px', marginTop: '5px' }}>
              Start a conversation by clicking "Contact Now" on any task
            </div>
          </div>
        ) : (
          filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => initializeChat(chat)}
              style={{
                backgroundColor: '#fff',
                borderRadius: '10px',
                padding: '15px',
                marginBottom: '10px',
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '5px'
              }}>
                <div style={{ fontWeight: 'bold' }}>{chat.sender}</div>
                <div style={{ fontSize: '14px', color: '#666' }}>{chat.timestamp}</div>
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>{chat.taskTitle}</div>
              <div style={{
                fontSize: '14px',
                color: '#666',
                marginTop: '5px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {chat.message}
              </div>
              {chat.unreadCount > 0 && (
                <div style={{
                  backgroundColor: '#007AFF',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  position: 'absolute',
                  top: '10px',
                  right: '10px'
                }}>
                  {chat.unreadCount}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatRoom; 