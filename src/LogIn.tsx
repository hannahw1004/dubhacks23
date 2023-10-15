import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Typography, Spin } from "antd";
import { notification } from "antd";
import { logIn, logInGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import google from "./google.svg";

const { Title } = Typography;

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

const emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export const LogIn: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!loading) {
      // maybe trigger a loading screen
      setDone(true);
    }
    if (user) {
      // redirect to home page
      navigate("/createprofile");
    }
  }, [user, loading]);
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (success: boolean, message: string) => {
    if (success) {
      api.success({
        message: "Success",
        description: message,
        placement: "bottomRight",
      });
    } else {
      api.error({
        message: "Error",
        description: message,
        placement: "bottomRight",
      });
    }
  };

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    const status = await logIn(values);
    console.log(status);
    openNotification(status.success, status.message);
  };

  const onLogInGoogle = async () => {
    const status = await logInGoogle();
    openNotification(status.success, status.message);
  };

  if (!done) {
    return <div className="centered-wrapper"><Spin size="large"/></div>;
  }
  return (
    <div className="centered-wrapper">
      {contextHolder}
      <Title level={2} style={{ marginBottom: "1em" }}>
        Log In
      </Title>
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
          rules={[
            { required: true, message: "Please input your Email!" },
            () => ({
              validator(_, value) {
                if (value.length === 0 || emailRegex.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Please enter a valid email address")
                );
              },
            }),
          ]}
        >
          <Input
            size="large"
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="username"
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
          <Button
            type="default"
            className="login-form-button"
            onClick={onLogInGoogle}
          >
            <img
              src={google}
              alt="Google"
              style={{
                height: "1em",
                width: "1em",
                marginRight: "0.5em",
                verticalAlign: "middle",
              }}
            />
            Register with Google
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
};

export default LogIn;
