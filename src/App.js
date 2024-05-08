import React from 'react';
import SignUp from './components/SignUp/SignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogIn from './components/LogIn/LogIn';
import TaskList from './components/Tasks/TaskList';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/" element={<LogIn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
