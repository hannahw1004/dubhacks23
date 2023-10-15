import React, { useState, useEffect } from "react";
import {
  Button,
  Flex,
  Col,
  Popconfirm,
  message,
  Spin,
  Tabs,
} from "antd";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, confirmRequest } from "./firebase";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import type { Room } from "./firebase";

import {
  getFloorsFromCommunity,
  getRoomsFromFloor,
  getUserInfo,
} from "./firebase";

type DashboardGripProps = {
  floor: string;
  community: string;
  user: string;
};

const currentPath = window.location.pathname;
const modalRoutes = ["/dashboard", "/requests", "/notifications"];
const { TabPane } = Tabs;

const legend = (
  // Write a legend with the following colors:
  // #FFE871: food
  // #C1E153: items
  // #6FD3F2: study
  // #F383B6: Maintenance
  // #9DBCE2: social
  <div>
    <h2>Legend</h2>
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1em'}}>
        <div style={{width: '20px', height: '20px', backgroundColor: '#FFE871'}}></div>
        <p>Food</p>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1em'}}>
        <div style={{width: '20px', height: '20px', backgroundColor: '#C1E153'}}></div>
        <p>Items</p>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1em'}}>
        <div style={{width: '20px', height: '20px', backgroundColor: '#6FD3F2'}}></div>
        <p>Study</p>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1em'}}>
        <div style={{width: '20px', height: '20px', backgroundColor: '#F383B6'}}></div>
        <p>Maintenance</p>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1em'}}>
        <div style={{width: '20px', height: '20px', backgroundColor: '#9DBCE2'}}></div>
        <p>Social</p>
      </div>
    </div>
  </div>
);

const colorMap: any = {
  "Eat": "#FFE871",
  "Study": "#6FD3F2",
  "Party": "#9DBCE2",
  "Share": "#C1E153",
  "Maintenance": "#F383B6",
  "Other": "#FF9933",
  "none": "#555555",
};

const DashboardGrid = ({
  floor,
  community,
  user,
}: DashboardGripProps): JSX.Element => {
  const [rooms, setRooms] = useState<any[]>([]);

  const handleConfirm = async (room: Room) => {
    if (!room.request) {
      return;
    }
    await confirmRequest(community, floor, room.id, user);
    message.success("Request confirmed!");
  };

  useEffect(() => {
    (async () => {
      const rooms = await getRoomsFromFloor(community, floor);
      setRooms(rooms);
    })();
  }, []);

  if (rooms.length === 0) {
    return <Spin />;
  }

  return (
    <div style={{width: '100%', display: "flex"}}>
      <div style={{width: '50%'}}>
        <h2>Rooms With Requests</h2>
        <Flex wrap="wrap" align="flex-start" justify="flex-start" gap="middle">
          {rooms.map((room: Room, index) => (
            <Col span={6} key={index}>
              <Popconfirm
                title={`Room ${room.id} has requested ${room.request?.description ?? "nothing"}`}
                onConfirm={() => handleConfirm(room)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" style={{ background: colorMap[room.request?.type ?? "none"]}}>Room {room.id}</Button>
              </Popconfirm>
            </Col>
          ))}
        </Flex>
      </div>
      {legend}
    </div>
  );
};

export const DashboardTabs = () => {
  const [user, loading, error] = useAuthState(auth);

  const [floors, setFloors] = useState<string[]>([]);
  const [community, setCommunity] = useState<string>("");
  const [userInfo, setUserInfo] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      (async () => {
        const res = await getUserInfo(user);
        console.log(res);
        const community = res.community;
        const floors = await getFloorsFromCommunity(community);
        setFloors(floors);
        setCommunity(community);
        setUserInfo(res);
        console.log(floors);
      })();
    }
    if (!user) {
      // redirect to home page
      navigate("/login");
    }
  }, [user, loading]);

  if (floors.length === 0) {
    return <Spin />;
  }

  return (
      <Tabs>
        {floors.map((floor, index) => (
          <TabPane tab={"floor " + floor} key={index}>
            <DashboardGrid floor={floor} community={community} user={userInfo.name} />
          </TabPane>
        ))}
      </Tabs>
  );
};

export default DashboardTabs;
