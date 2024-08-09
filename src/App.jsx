import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import VideoPlayer from './components/VideoPlayer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/video" element={<VideoPlayer />} />
      </Routes>
    </Router>
  );
}

export default App;
