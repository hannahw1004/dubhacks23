import React from "react";
import { Button, Form, Input, Select } from "antd";
import google from "./google.svg";

type SizeType = Parameters<typeof Form>[0]["size"];

const onFinish = (values: any) => {
  console.log("Success:", values);
};

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
      <Form
        name="basic"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 16 }}
        style={{ width: 500}}
        layout="horizontal"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="username"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
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
          <Input.Password />
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
