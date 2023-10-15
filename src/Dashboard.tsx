import React, {useState, useEffect} from 'react';
import { Button, Row, Col, Popconfirm, message, Tabs, Spin } from 'antd';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { useNavigate } from 'react-router-dom';

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
              title={`Are you sure you want to click button for "${index}"?`}
              onConfirm={handleConfirm}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary">Button for "{index}"</Button>
            </Popconfirm>
          </Col>
        ))}
      </Row>
    </div>
  );
};


export const DashboardTabs = () => {

  const [user, loading, error] = useAuthState(auth);

  const [floors, setFloors] = useState<string[]>([]);
  const [community, setCommunity] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      (async () => {
        const res = await getUserInfo(user)
        console.log(res);
        const community = res.community;
        const floors = await getFloorsFromCommunity(community);
        setFloors(floors);
        setCommunity(community);
        console.log(floors);
      })();
    }
    if (!user) {
      // redirect to home page
      navigate("/login");
    }
  }, [user, loading]);

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

