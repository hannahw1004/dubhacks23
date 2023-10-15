import React from 'react';
import { Button, Row, Col, Popconfirm, message } from 'antd';

const Dashboard: React.FC = () => {
  const handleConfirm = () => {
    message.success('Button clicked!');
  };

  const rooms = [
    'Entry 1',
    'Entry 2',
    'Entry 3',
    'Entry 4',
    // Add room data
  ];

  return (
    <div>
      <h2>Button Grid with Popconfirm</h2>
      <Row gutter={16}>
        {rooms.map((room, index) => (
          <Col span={6} key={index}>
            <Popconfirm
              title={`Are you sure you want to click button for "${room}"?`}
              onConfirm={handleConfirm}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary">Button for "{room}"</Button>
            </Popconfirm>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Dashboard;

