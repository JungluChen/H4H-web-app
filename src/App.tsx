import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import HomePage from './pages/HomePage';
import ChatRoom from './pages/ChatRoom';
import TaskBrowsing from './pages/TaskBrowsing';
import PersonalInfo from './pages/PersonalInfo';
import TaskPosting from './pages/TaskPosting';
import Achievements from './pages/Achievements';
import Navigation from './components/Navigation';
import ScrollContainer from './components/ScrollContainer';

function App() {
  return (
    <div style={{ 
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '430px',
        backgroundColor: '#f5f5f5',
        position: 'relative',
        height: '100vh',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <BrowserRouter>
          <TopBar />
          <ScrollContainer>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/chat" element={<ChatRoom />} />
              <Route path="/tasks" element={<TaskBrowsing />} />
              <Route path="/profile" element={<PersonalInfo />} />
              <Route path="/post" element={<TaskPosting />} />
              <Route path="/achievements" element={<Achievements />} />
            </Routes>
          </ScrollContainer>
          <Navigation />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App; 