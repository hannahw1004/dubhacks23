import React, {useState, useEffect} from 'react';
import { Button, Row, Col, Popconfirm, message, Tabs, Spin } from 'antd';

import {getFloorsFromCommunity, getRoomsFromFloor, getUserInfo} from './firebase'

const{TabPane} = Tabs;

type DashboardGripProps = {
  floor: string,
  community: string
}

const DashboardGrid = ({floor, community}: DashboardGripProps): JSX.Element => {

  const [rooms, setRooms] = useState<any[]>([]);

  const handleConfirm = () => {
    message.success('Button clicked!');
  };

  useEffect(() => {
    (
      async () => {
        const rooms = await getRoomsFromFloor(community, floor);
        setRooms(rooms);
      }
    )();
  }, []
  );

  if(rooms.length === 0){
    return <Spin/>;
  }

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


export const DashboardTabs = () => {
  const [floors, setFloors] = useState<string[]>([]);
  const [community, setCommunity] = useState<string>("");


  useEffect(() => {
    (
      async () => {
        const {community} = await getUserInfo()
        setFloors(await getFloorsFromCommunity(community)); 
        setCommunity(community);
      }
    )()
  }, []
  );

  if(floors.length === 0){
    return <Spin/>;
  }

  return (
    <Tabs>
      {floors.map((floor, index) => (
        <TabPane tab={"floor " + floor} key={index}>
          <DashboardGrid floor={floor} community={community}/>
        </TabPane>
      ))}
    </Tabs>
  );
};

export default DashboardTabs;

