import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuUnfoldOutlined, MenuFoldOutlined, UnorderedListOutlined, HomeOutlined, BellOutlined }
    from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';

const { Sider, Content } = Layout;
// const collapsed = false;

const NavBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
        >
            <img src="/logo192.png" alt="logo" style={{width: "90%", padding: "10%"}}/>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    left: 0
                }}
            >
                <Menu.Item
                    key="1"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}>
                </Menu.Item>
                <Menu.Item
                    key="2"
                    icon={<HomeOutlined />}>
                    <Link to="/dashboard">Dashboard</Link>
                </Menu.Item>
                <Menu.Item
                    key="3"
                    icon={<UnorderedListOutlined />}>
                    <Link to="/requests">My Requests</Link>
                </Menu.Item>
                <Menu.Item
                    key="4"
                    icon={<BellOutlined />}>
                    <Link to="/notifications">Notifications</Link>
                </Menu.Item>
            </Menu>
        </Sider>
        <Content style = {{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280
        }}>
        </Content>
    </Layout>
  );
};

export default NavBar;
// export { NavBar, collapsed };