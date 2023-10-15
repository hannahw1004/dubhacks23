import React, { useState, useEffect } from "react";
import {
  Button,
  Row,
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

const DashboardGrid = ({
  floor,
  community,
  user,
}: DashboardGripProps): JSX.Element => {
  const [rooms, setRooms] = useState<any[]>([]);

  const handleConfirm = async (room: Room) => {
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
    <div>
      <h2>Button Grid with Popconfirm</h2>
      <Row gutter={16}>
        {rooms.map((room: Room, index) => (
          <Col span={6} key={index}>
            <Popconfirm
              title={`Room ${room.id} has requested ${room.request?.description ?? "nothing"}`}
              onConfirm={() => handleConfirm(room)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary">Room {room.id}</Button>
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
