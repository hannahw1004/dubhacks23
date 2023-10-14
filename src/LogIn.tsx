import React from 'react';
import {Link} from "react-router-dom"
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';

const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

export const Login: React.FC = () => (
    <div className ="centered-wrapper">
        <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item<FieldType>
            label="Email"
            name="username"
            rules={[{ required: true, message: 'Please input your Email!' }]}
        >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email"/>
        </Form.Item>

        <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
            <Input.Password 
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
            />
        </Form.Item>

        <Form.Item<FieldType>
            name="remember"
            valuePropName="checked" 
            noStyle
        >
            <Checkbox>Remember me</Checkbox>

            <a className="login-form-forgot" href="">
                Forgot password
            </a>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" className="login-form-button">
                Log In
            </Button>
            Or <Link to="/SignUp">register now!</Link>
        </Form.Item>
    </Form>
    </div>
    
);

export default Login;


