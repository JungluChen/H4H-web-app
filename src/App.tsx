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

function App() {
  return (
    <BrowserRouter>
      <div className="app-container" style={{
        maxWidth: '430px',
        margin: '0 auto',
        minHeight: '100vh',
        backgroundColor: '#000',
        position: 'relative'
      }}>
        <TopBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatRoom />} />
          <Route path="/tasks" element={<TaskBrowsing />} />
          <Route path="/profile" element={<PersonalInfo />} />
          <Route path="/post" element={<TaskPosting />} />
          <Route path="/achievements" element={<Achievements />} />
        </Routes>
        <Navigation />
      </div>
    </BrowserRouter>
  );
}

export default App; 