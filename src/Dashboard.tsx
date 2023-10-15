import React from 'react';
import { Button, Row, Col, Popconfirm, message, Tabs } from 'antd';

import {getFloorsFromCommunity, getRoomsFromFloor, getUserInfo} from './firebase'

const{TabPane} = Tabs;

const DashboardGrid: React.FC = () => {
  const handleConfirm = () => {
    message.success('Button clicked!');
  };

  const rooms = getRoomsFromFloor;

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


export const DashboardTabs = (data: getFloorsFromCommunity()) => {
  return (
    <Tabs>
      {data.map((floor, index) => (
        <TabPane tab={floor.title} key={index}>
          {floor.content}
        </TabPane>
      ))}
    </Tabs>
  );
};

export default DashboardTabs;

