import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import google from "./google.svg";
import {signUp} from "./firebase";


const onFinish = (values: any) => {
  console.log("Success:", values);
  signUp(values);
};


//signUp(onFinish)

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};



type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export const SignUp: React.FC = () => {

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
  return (
    <div className="centered-wrapper">
        <Form onFinish={onFinish}
            name="basic"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 16 }}
            style={{ width: 500}}
            layout="horizontal"
            initialValues={{ remember: true }}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            

        <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
        <Input.Password />
        </Form.Item>

                <Input
                    size="large"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    type="username"
                    placeholder="Email"
                />
            

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
                <Button type="primary" htmlType="submit" style={{marginRight: "1em"}}>
                    Register
                </Button>
                <Button
                    type="default"
                    htmlType="submit"
                    className="login-form-button"
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
