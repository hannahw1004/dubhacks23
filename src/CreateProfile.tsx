import React from 'react';
import { Form, Input, Button, Select, Upload, Typography } from 'antd';
import { UploadOutlined, InstagramOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Title } = Typography;

const onFinish = (values: any) => {
    console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
};

const CreateProfile: React.FC = () => {
  return (
    <div className="centered-wrapper">
        <Title level={2} style={{marginBottom: "1em"}}>Join Community</Title>
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
                rules={[{ required: true, message: "Please enter your name" }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Profile Picture" name="profilePicture">
                <Upload>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Form.Item>

            <Form.Item 
                label="Instagram Handle" 
                name="instagramHandle">
                <Input
                    prefix={<InstagramOutlined className="site-form-item-icon" />}
                />
            </Form.Item>

            <Form.Item 
                label="Community" 
                name="community" 
                rules={[{ required: true, message: 'Select a community to join' }]}>
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
                rules={[{ required: true, message: 'Enter a room number' }]}>
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