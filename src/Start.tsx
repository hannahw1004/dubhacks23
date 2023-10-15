import React from 'react';
import logo1 from "./logo1.png";
import { Link } from "react-router-dom";
import { Button } from "antd";

const onFinish = (values: any) => {
    console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
};

const Start: React.FC = () => {
    return (
      <div className="right-wrapper">
        <Link to="/login">
            <Button type="primary" className="get-started-button">
                Get started!
            </Button>
           
        </Link>
      </div>
    );
  };

export default Start;