"use client";
import { Button, Space } from "antd";

export default function Home() {
  return (
    <div>
      <h2>Job portal</h2>
      <Button type="primary" onClick={() => confirm("are you sure")}>
        Primary Button
      </Button>
    </div>
  );
}
