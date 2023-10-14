import React from 'react';
import logo from './logo.svg';
import Start from './Start';
import {SignUp} from './SignUp';
import {Login} from './LogIn';
import CreateProfile from './CreateProfile';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/createprofile" element={<CreateProfile />} />
      </Routes>
    </Router>
  );
}

export default App;

