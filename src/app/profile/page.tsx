"use client";
import EmployeeForm from "@/components/EmployeeForm";
import EmployerForm from "@/components/EmployerForm";
import PageTitle from "@/components/PageTitle";
import { SetLoading } from "@/redux/loadersSlice";
import { Button, Form, message } from "antd";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setCurrentUser } from "@/redux/usersSlice";

const Profile = () => {
  const { currentUser } = useSelector((state: any) => state.users);

  const dispatch = useDispatch();
  const onFinish = async (values: any) => {
    // console.log("values =>", values);

    try {
      values._id = currentUser._id;
      values.userType = currentUser.userType;

      dispatch(SetLoading(true));
      const response = await axios.put("/api/users", values);
      message.success(response.data.message);
      dispatch(setCurrentUser(response.data.data));
    } catch (error: any) {
      message.error(error.response.data.message || "something went wrong");
    } finally {
      dispatch(SetLoading(false));
    }
  };
  return (
    <div>
      <PageTitle title="Profile" />
      <Form onFinish={onFinish} initialValues={currentUser} layout="vertical">
        {currentUser?.userType === "employer" ? (
          <EmployerForm />
        ) : (
          <EmployeeForm />
        )}
        <div className="flex justify-end my-3">
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Profile;
