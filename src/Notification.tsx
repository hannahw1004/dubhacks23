import React, {useState, useEffect} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, getRequest, getUserInfo, Request } from './firebase';
import { Spin } from 'antd';

const Notification: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const [done, setDone] = useState(false);
  const [request, setRequest] = useState<Request>(null);
  useEffect(() => {
    if (user) {
      // redirect to home page
      (async () => {
        const userInfo = await getUserInfo(user);
        const request = await getRequest(userInfo.community, userInfo.floor, userInfo.roomNumber);
        setRequest(request);
        setDone(true);
      })();
    }
  }, [user, loading]);
  if (!done) {
    return (
      <div className="centered-wrapper">
        <Spin size="large" />
      </div>
    );
  }
  return (
    <div>
      <h1>{request === null ? "You currently have not added a Request"
           : request.status === "accepted" ? `Your request has been accepted by ${request?.user}!`
           : "Your request is still pending"}</h1>
    </div>
  );
};

export default Notification;
