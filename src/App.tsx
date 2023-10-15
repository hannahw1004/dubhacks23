import React from "react";
import logo from "./logo.svg";
import Start from "./Start";
import { SignUp } from "./SignUp";
import { LogIn } from "./LogIn";
import CreateProfile from "./CreateProfile";
import { MainPage } from "./MainPage";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const currentPath = window.location.pathname;
  const modalRoutes = ["/dashboard", "/requests", "/notifications"];

  return (
      <Router>
        {/* {modalRoutes.includes(currentPath) && <Sider><NavBar /></Sider>} */}
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/createprofile" element={<CreateProfile />} />
          <Route path="/app/*" element={<MainPage />} />
        </Routes>
      </Router>
  );
}

export default App;
