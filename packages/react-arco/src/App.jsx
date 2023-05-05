import React, { useEffect, useState } from "react";
import axios from 'axios'

function App() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await axios.get("/api/user/userInfo");
        setUserInfo(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfo();
  }, []);

  return (
    <>
      <h1>用户信息</h1>
      <p>{userInfo?.name}</p>
      <p>{userInfo?.job}</p>
      <p>{userInfo?.organization}</p>
      <p>{userInfo?.introduction}</p>
    </>
  );
}
export default App;
