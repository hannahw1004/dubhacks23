import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Upload, Typography, InputNumber, Spin, ConfigProvider } from "antd";
import { UploadOutlined, InstagramOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { notification } from "antd";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { addProfile, userHasProfile } from "./firebase";

const { Option } = Select;
const { Title } = Typography;

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const CreateProfile: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && user) {
      // maybe trigger a loading screen
      (async () => {
        const hasProfile = await userHasProfile();
        if (hasProfile) {
          navigate("/app/dashboard");
        } else {
            setDone(true);
        }
      })();
    }
    if (!user) {
      // redirect to home page
      navigate("/login");
    }
  }, [user, loading, navigate]);
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
  const props: UploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type === "image/png" || file.type === "image/jpeg";
      if (!isImage) {
        openNotification(false, `${file.name} is not supported`);
      }
      const isGt1M = file.size / 1024 / 1024 > 1;
      if (isGt1M) {
        openNotification(false, `${file.name} is too large (max 1MB)`);
      }
      return isImage || Upload.LIST_IGNORE || !isGt1M;
    },
    onChange: (info) => {
        info.file.status = "done";
    },
    listType: "picture",
  };
  const onFinish = async (values: any) => {
    console.log("Success:", values);
    const status = await addProfile(values);
    openNotification(status.success, status.message);
    if (status.success) {
        navigate("/app/dashboard");
    }
  };

  if (!done) {
    return <div className="centered-wrapper"><Spin size="large" /></div>;
  }

  return (
    <div className="centered-wrapper">
      {contextHolder}
      <Title level={2} style={{ marginBottom: "1em" }}>
        Join Community
      </Title>
      <Form
        name="createProfile"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: 500 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <ConfigProvider
          theme={{
            token: {
              colorPrimary:'#77529F',
              borderRadius: 4,
              colorBgContainer: '#FFFFFF',
            },
          }}>
            <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Profile Picture" name="profilePicture" rules={[{required: true, message: "Please upload a profile picture"}]}>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Instagram Handle" name="instagramHandle">
          <Input
            prefix={<InstagramOutlined className="site-form-item-icon" />}
          />
        </Form.Item>

        <Form.Item
          label="Community"
          name="community"
          rules={[{ required: true, message: "Select a community to join" }]}
        >
          <Select>
            <Option value="maple">Maple Hall</Option>
            <Option value="lander">Lander Hall</Option>
            <Option value="willow">Willow Hall</Option>
            <Option value="m">The M</Option>
            <Option value="olv">Oliv</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Room Number"
          name="roomNumber"
          rules={[{ required: true, message: "Enter a room number" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
            label="Floor Number"
            name="floorNumber"
            rules={[{ required: true, message: "Enter a floor number" }]}
        >
            <InputNumber />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>
        </ConfigProvider>
        
        <ConfigProvider
          theme={{
            token: {
              colorPrimary:'#77529F',
              borderRadius: 4,
              colorBgContainer: '#77529F',
            },
          }}>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Create Profile
              </Button>
            </Form.Item>
          </ConfigProvider>

      </Form>
    </div>
  );
};

export default CreateProfile;
