import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { Layout, Tabs } from "antd";
import DashboardTabs from "./Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
          </Routes>
        </Content>
      </Layout>
  );
};
