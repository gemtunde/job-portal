"use client";
import JobPostForm from "@/components/JobPostForm";
import PageTitle from "@/components/PageTitle";
import { SetLoading } from "@/redux/loadersSlice";
import { Button, Form, message } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

function NewJob() {
  const router = useRouter();
  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.post("/api/jobs", values);
      message.success(response.data.message);
      router.push("/jobs");
    } catch (error: any) {
      message.error(error.response.data.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Post New Jobs" />
        <Button onClick={() => router.push("/jobs")} type="default">
          Back
        </Button>
      </div>

      <Form layout="vertical" onFinish={onFinish}>
        <JobPostForm />
        <div className="flex justify-end items-center my-3 gap-3">
          <Button onClick={() => router.back()} type="default">
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Post Job
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default NewJob;
