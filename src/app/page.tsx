"use client";
import { Button, Space, message } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [user, setUser] = useState<any>([]);

  //get current users
  const getUser = async () => {
    try {
      const response = await axios.get("/api/users/currentuser");
      setUser(response.data.data);
    } catch (error: any) {
      message.error(error.response.data.message);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <h2>Job portal</h2>
      <p>user name : {user && user.name}</p>

      <Button type="primary" onClick={() => confirm("are you sure")}>
        Primary Button
      </Button>
    </div>
  );
}
