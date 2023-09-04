"use client";
import { Button, Form, Radio, message } from "antd";
import axios from "axios";
import Link from "next/link";
import React, { use } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { SetLoading } from "@/redux/loadersSlice";

const Register = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const onFinish = async (values: any) => {
    // console.log("success", values);
    try {
      dispatch(SetLoading(true));
      const response = await axios.post("/api/users/register", values);
      message.success(response.data.message);
      router.push("/login");
    } catch (error: any) {
      message.error(error.response.data.message || "SOmething went wrong");
    } finally {
      dispatch(SetLoading(false));
    }
  };
  return (
    <div className="flex justify-center h-screen items-center bg-primary">
      <div className="card p-5 w-450">
        <h2 className="text-xl">Register</h2>
        <hr />
        <Form
          onFinish={onFinish}
          layout="vertical"
          className="flex flex-col gap-5"
        >
          <Form.Item label="Register as" name="userType">
            <Radio.Group>
              <Radio value="employer">Employer</Radio>
              <Radio value="employee">Employee</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Name" name="name">
            <input type="text" className="input" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <input type="email" className="input" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <input type="password" className="input" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>{" "}
          <Link href="/login">Already have an account?&nbsp;Login</Link>
        </Form>
      </div>
    </div>
  );
};

export default Register;
