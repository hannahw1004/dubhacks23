// drop down for request type 

// date & time 
// input box for detail 
// Add button

import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Upload, Typography, InputNumber, Spin } from "antd";
import { notification } from "antd";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import {addRequest, getUserInfo} from './firebase'

const { Option } = Select;
const { Title } = Typography;

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const CreateRequest: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const [done, setDone] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      (async () => {
        const userInfo = await getUserInfo(user);
        if (userInfo === null) {
          navigate("/createprofile");
        }
        setUserInfo(userInfo);
        setDone(true);
      })();
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
    const status = await addRequest(values, userInfo.community, userInfo.floor, userInfo.roomNumber, userInfo.name);
    openNotification(status.success, status.message);
    if (status.success) {
        navigate("/app/dashboard");
    }
  };

  if (!done) {
    return <div className="centered-wrapper"><Spin size="large" /></div>;
  }

  return (
    <div>
      {contextHolder} 
      <Title level={2} style={{ marginBottom: "1em" }}>
        Create Request
      </Title>
      <Form
        name="createRequest"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: 500 }}
        onFinish={onFinish}
        autoComplete="off"
      >

        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: "Select type of event" }]}
        >
          <Select>
            <Option value="Eat">Food</Option>
            <Option value="Study">Study</Option>
            <Option value="Party">Social</Option>
            <Option value="Share">Items</Option>
            <Option value="Maintenance">Maintenance</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item 
            label="Description" 
            name="description" 
            rules={[{ required: true, message: "Describe Request" }]}>
          <Input.TextArea />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Create Request
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateRequest;
