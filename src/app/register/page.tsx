"use client";
import { Button, Form, Radio } from "antd";
import Link from "next/link";
import React from "react";

const Register = () => {
  const onFinish = (values: any) => {
    console.log("success", values);
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
