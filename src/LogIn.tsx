import React from "react";
import { Link } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import google from "./google.svg";

const { Title } = Typography;

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export const Login: React.FC = () => (
  <div className="centered-wrapper">
    <Title level={2} style={{marginBottom: "1em"}}>Log In</Title>
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      style={{ width: "500px" }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Email"
        name="username"
        rules={[{ required: true, message: "Please enter your email" }]}
      >
        <Input
          size="large"
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please enter your password" }]}
      >
        <Input.Password
          size="large"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item<FieldType>
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 4, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          style={{ marginRight: "1em" }}
        >
          Log In
        </Button>
        <Button type="default" htmlType="submit" className="login-form-button">
          <img
            src={google}
            alt="Google"
            style={{ height: "1em", width: "1em", marginRight: "0.5em", verticalAlign: "middle" }}
          />
          Log In with Google
        </Button>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <a className="login-form-forgot" href="">
          Forgot password?
        </a>
        <br />
        Or <Link to="/signup">register now!</Link>
      </Form.Item>
    </Form>
  </div>
);

export default Login;
