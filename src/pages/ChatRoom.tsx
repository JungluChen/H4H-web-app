import React, { useState, useRef, useEffect } from 'react';
import { useTaskStore } from '../store/taskStore';
import DemoDisclaimer from '../components/DemoDisclaimer';
import BottomNavigation from '../components/BottomNavigation';
import { useLocation } from 'react-router-dom';

interface ChatMessage {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

const ChatRoom = () => {
  const location = useLocation();
  const chats = useTaskStore(state => state.chats);
  const readMessages = useTaskStore(state => state.readMessages);
  const markChatAsRead = useTaskStore(state => state.markChatAsRead);
  const [selectedChat, setSelectedChat] = useState<typeof chats[0] | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle initial chat from navigation
  useEffect(() => {
    const state = location.state as { initialChat?: typeof chats[0] };
    if (state?.initialChat) {
      initializeChat(state.initialChat);
    }
  }, [location]);

  const initializeChat = (chat: typeof chats[0]) => {
    setSelectedChat(chat);
    setMessages([
      {
        id: '1',
        text: chat.message,
        sender: chat.sender,
        timestamp: chat.timestamp
      }
    ]);
    if (!readMessages.includes(chat.id)) {
      markChatAsRead(chat.id);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'You',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div style={{ 
      position: 'relative',
      height: '100vh',
      maxWidth: '430px',
      margin: '0 auto',
      backgroundColor: '#111'
    }}>
      <div style={{ 
        padding: '20px',
        paddingBottom: '80px', // Add padding for BottomNavigation
        height: '100%',
        overflowY: 'auto'
      }}>
        <DemoDisclaimer />
        
        {selectedChat ? (
          // Chat View
          <div style={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#111',
            margin: '-20px',
            marginBottom: '-80px',
            position: 'relative',
            zIndex: 1,
            height: 'calc(100vh - 120px)'
          }}>
            {/* Chat Header */}
            <div style={{
              padding: '15px 20px',
              backgroundColor: '#222',
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid #333'
            }}>
              <button
                onClick={() => setSelectedChat(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '20px',
                  marginRight: '15px',
                  cursor: 'pointer'
                }}
              >
                ←
              </button>
              <h3 style={{ margin: 0, color: 'white' }}>{selectedChat.sender}</h3>
            </div>

            {/* Messages Container */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    alignSelf: msg.sender === 'You' ? 'flex-end' : 'flex-start',
                    maxWidth: '70%'
                  }}
                >
                  <div style={{
                    backgroundColor: msg.sender === 'You' ? '#007AFF' : '#333',
                    padding: '10px 15px',
                    borderRadius: '18px',
                    color: 'white'
                  }}>
                    {msg.text}
                  </div>
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#666',
                    marginTop: '5px',
                    textAlign: msg.sender === 'You' ? 'right' : 'left'
                  }}>
                    {msg.timestamp}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div style={{
              padding: '15px 20px',
              backgroundColor: '#222',
              borderTop: '1px solid #333',
              position: 'sticky',
              bottom: 0,
              zIndex: 2
            }}>
              <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '20px',
                    border: '1px solid #333',
                    backgroundColor: '#333',
                    color: 'white',
                    fontSize: '16px'
                  }}
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  style={{
                    padding: '12px 20px',
                    backgroundColor: '#007AFF',
                    border: 'none',
                    borderRadius: '20px',
                    color: 'white',
                    cursor: newMessage.trim() ? 'pointer' : 'not-allowed',
                    opacity: newMessage.trim() ? 1 : 0.5
                  }}
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        ) : (
          // Chat List View
          <div>
            <div style={{ marginBottom: '20px' }}>
              <input 
                type="text" 
                placeholder="Search..."
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #333',
                  backgroundColor: '#222',
                  color: 'white'
                }}
              />
            </div>

            {chats.map((chat) => (
              <div 
                key={chat.id}
                data-chat-id={chat.id}
                onClick={() => initializeChat(chat)}
                style={{
                  backgroundColor: '#222',
                  borderRadius: '10px',
                  padding: '15px',
                  marginBottom: '15px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '8px',
                  alignItems: 'center'
                }}>
                  <h3 style={{ 
                    margin: 0,
                    color: 'white',
                    fontSize: '16px'
                  }}>
                    {chat.sender}
                  </h3>
                  <span style={{ 
                    color: '#999',
                    fontSize: '14px',
                    flex: 1,
                    marginLeft: '12px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {chat.taskTitle}
                  </span>
                  {!readMessages.includes(chat.id) && chat.unreadCount > 0 && (
                    <span style={{ 
                      backgroundColor: '#007AFF',
                      borderRadius: '50%',
                      padding: '2px 8px',
                      color: 'white',
                      fontSize: '14px',
                      marginLeft: '8px'
                    }}>
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <p style={{ 
                    margin: 0,
                    color: '#999',
                    fontSize: '14px',
                    flex: 1,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    paddingRight: '12px'
                  }}>
                    {chat.message}
                  </p>
                  <span style={{ 
                    color: '#666',
                    fontSize: '12px',
                    whiteSpace: 'nowrap'
                  }}>
                    {chat.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <BottomNavigation />
    </div>
  );
};

export default ChatRoom; 