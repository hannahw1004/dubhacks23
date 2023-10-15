<<<<<<< HEAD
import React from 'react';
import logo from './logo.svg';
import Start from './Start';
import {SignUp} from './SignUp';
import {LogIn} from './LogIn';
import Dashboard from './Dashboard'
import CreateRequest from './Request';
import CreateProfile from './CreateProfile';
import './App.css';
=======
import React from "react";
import logo from "./logo.svg";
import Start from "./Start";
import { SignUp } from "./SignUp";
import { LogIn } from "./LogIn";
import CreateProfile from "./CreateProfile";
import { MainPage } from "./MainPage";
import "./App.css";
>>>>>>> 7d30cbcc15c8f977867932565eafaf0548336109
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const currentPath = window.location.pathname;
  const modalRoutes = ["/dashboard", "/requests", "/notifications"];

  return (
      <Router>
        {/* {modalRoutes.includes(currentPath) && <Sider><NavBar /></Sider>} */}
<<<<<<< HEAD
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
=======
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/createprofile" element={<CreateProfile />} />
          <Route path="/app/*" element={<MainPage />} />
        </Routes>
      </Router>
>>>>>>> 7d30cbcc15c8f977867932565eafaf0548336109
  );
}

export default App;
