import React from 'react';
import logo from './logo.svg';
import Start from './Start';
import {SignUp} from './SignUp';
import {LogIn} from './LogIn';
import Dashboard from './Dashboard'
import CreateRequest from './Request';
import CreateProfile from './CreateProfile';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from './NavBar';
import { Layout } from 'antd';

const { Sider, Content } = Layout;

function App() {
  const currentPath = window.location.pathname;
  const modalRoutes = ['/dashboard', '/requests', '/notifications'];

  return (
    <div className = "app-container">
    <Router>
      <Layout>
        <Sider><NavBar /></Sider>
        {/* {modalRoutes.includes(currentPath) && <Sider><NavBar /></Sider>} */}
        <Content style={{ padding: '24px 50px' }}>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/createprofile" element={<CreateProfile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/createrequest" element={<CreateRequest />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
    </div>
  );
}

export default App;

