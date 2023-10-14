import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import google from "./google.svg";
import { signUp, logInGoogle } from "./firebase";
import { notification } from 'antd';

//signUp(onFinish)

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 10,
    },
    sm: {
      span: 16,
      offset: 10,
    },
  },
};

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export const SignUp: React.FC = () => { 
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (success: boolean, message: string) => {
    if (success) {
      api.success({
        message: "Success",
        description: message,
        placement: "bottomRight"
      });
    } else {
      api.error({
        message: "Error",
        description: message,
        placement: "bottomRight"
      });
    }
  };

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    const status = await signUp(values);
    console.log(status);
    openNotification(status.success, status.message);
  };

  const onLogInGoogle = async () => {
    const status = await logInGoogle();
    openNotification(status.success, status.message);
  }
  return (
    <div className="centered-wrapper">
      {contextHolder}
      <Form
        onFinish={onFinish}
        name="basic"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 16 }}
        style={{ width: 500 }}
        layout="horizontal"
        initialValues={{ remember: true }}
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
            })]}
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
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="Confirm Password"
            placeholder="Confirm Password"
          />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "1em" }}
          >
            Register
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
      </Form>
    </div>
  );
};

export default SignUp;
