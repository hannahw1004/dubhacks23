import React, { useEffect } from "react";
import { Form, Input, Button, Select, Upload, Typography } from "antd";
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
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (!user) {
      // redirect to home page
      navigate("/login");
    }
  }, [user, loading, navigate]);
  useEffect(() => {
    (async () => {
      const hasProfile = await userHasProfile();
      if (hasProfile) {
        navigate("/dashboard");
      }
    })();
  }, []);
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
      return !isImage || Upload.LIST_IGNORE || isGt1M;
    },
    onChange: (info) => {
      console.log(info.fileList);
    },
  };
  const onFinish = async (values: any) => {
    console.log("Success:", values);
    const status = await addProfile(values);
    openNotification(status.success, status.message);
  };

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
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Profile Picture" name="profilePicture">
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
            <Option value="comm1">Maple Hall</Option>
            <Option value="comm2">Lander Hall</Option>
            <Option value="comm3">Willow Hall</Option>
            <Option value="comm4">The M</Option>
            <Option value="comm5">Oliv</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Room Number"
          name="roomNumber"
          rules={[{ required: true, message: "Enter a room number" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Create Profile
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateProfile;
