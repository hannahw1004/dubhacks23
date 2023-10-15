import React from "react";

import { Link } from "react-router-dom";
import { Button } from "antd";
import arrow from "./angle-down-svgrepo-com.svg";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const Start: React.FC = () => {
  return (
    <>
      <div className="background">
        <div className="background-text">
          <h1>CaC: Create a Community</h1>
        </div>
        <div className="arrow-container">
          <img
            className="down-arrow"
            src={arrow}
            alt="down arrow"
          />
          <img
            className="down-arrow delayed"
            src={arrow}
            alt="down arrow"
          />
        </div>
      </div>
      <div className="right-wrapper">
        <img src="logo1.png" className="image"></img>
        <div className="top-bottom">
          <h2>"Connecting Lives, Building Communities!"</h2>
          <p className="desc">
            Welcome to CaC: Create a Community, where the power of connection
            transforms living spaces into vibrant communities. Whether you're a
            student in a dorm or a resident in an apartment, we're here to help
            you create meaningful connections and support each other in your
            daily life. Our website is designed to foster, socializing,
            collaboration, and shared experiences among residents. Join us in
            making your living space more than just a place to stay - it's a
            place to belong. Explore, connect, and grow with us today!
          </p>
          <Link to="/login">
            <Button type="primary" className="get-started-button">
              Get started!
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Start;
