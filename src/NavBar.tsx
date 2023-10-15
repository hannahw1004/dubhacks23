import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MenuUnfoldOutlined, MenuFoldOutlined, UnorderedListOutlined, HomeOutlined, BellOutlined, UserOutlined }
    from '@ant-design/icons';
import { Layout, Menu, Button, Avatar, Popover} from 'antd';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, getUserInfo, logout } from './firebase';

const { Sider, Content } = Layout;
// const collapsed = false;

const userMenu = (
    <Button danger type="primary" onClick={() => logout()}>
        Logout
    </Button>
)

const NavBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [image, setImage] = useState<string|null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      (async () => {
        const userInfo = await getUserInfo(user);
        if (userInfo === null) {
            navigate("/createprofile");
        }
        console.log(userInfo);
        const avatar = userInfo!.profilePicture;
        console.log(avatar);
        const base64 = avatar!.toBase64();
        const profileImageType = userInfo!.profilePictureType;
        const profileImageURL = `data:${profileImageType};base64,${base64}`;
        console.log(profileImageURL);
        setImage(profileImageURL);
      })();
    }
    if (!user && !loading) {
      // redirect to home page
      navigate("/login");
    }
  }, [user, loading]);

  return (
    <Layout>
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
        >
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{
                    overflow: 'auto',
                    left: 0,
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <img src="/logo192.png" alt="logo" style={{width: "90%", padding: "10%"}}/>
                <div style={{width: "100%"}}>
                    <Button
                        type="primary"
                        onClick={() => setCollapsed(!collapsed)}
                        style={{marginBottom: 16, width: "calc(100% - 8px)", marginInline: "4px", marginBlock: "4px"}}>
                            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </Button>
                </div>
                <Menu.Item
                    key="1"
                    icon={<HomeOutlined />}>
                    <Link to="/app/dashboard">Dashboard</Link>
                </Menu.Item>
                <Menu.Item
                    key="2"
                    icon={<UnorderedListOutlined />}>
                    <Link to="/app/requests">My Requests</Link>
                </Menu.Item>
                <Menu.Item
                    key="3"
                    icon={<BellOutlined />}>
                    <Link to="/app/notifications">Notifications</Link>
                </Menu.Item>
                <div style={{flexGrow: 1}}/>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "1em"}}>
                    <Popover content={userMenu}>
                        {
                            image !== null ?
                            <Avatar src={image} size="large" key={0}/> :
                            <Avatar icon={<UserOutlined/>} size="large" key={1}/>
                        }
                    </Popover>
                    {collapsed ? null : <div style={{marginLeft: "0.5em"}}>{user?.displayName}</div>}
                </div>
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