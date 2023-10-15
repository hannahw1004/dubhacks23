import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { Layout, Tabs } from "antd";
import DashboardTabs from "./Dashboard";
import CreateRequest from "./Request";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Notification from "./Notification";
const { Sider, Content } = Layout;

export const MainPage: React.FC = () => {
  return (
      <Layout>
        <Sider>
          <NavBar />
        </Sider>
        <Content style={{ padding: "24px 50px" }}>
          <Routes>
            <Route path="/" element={<DashboardTabs />} />
            <Route path="/dashboard" element={<DashboardTabs />} />
            <Route path="/requests" element={<CreateRequest />} />
            <Route path="/notifications" element={<Notification />} />
          </Routes>
        </Content>
      </Layout>
  );
};
