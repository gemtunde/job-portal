"use client";
import JobPostForm from "@/components/JobPostForm";
import PageTitle from "@/components/PageTitle";
import { SetLoading } from "@/redux/loadersSlice";
import { Button, Form, message } from "antd";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

function EditJob() {
  const [jobData, setJobData] = useState<any>(null);
  //navigation
  const router = useRouter();

  //get job_id from params
  const { jobid } = useParams();

  //state
  const dispatch = useDispatch();

  //functions for editing the form
  const onFinish = async (values: any) => {
    try {
      dispatch(SetLoading(true));
      values._id = jobid;
      const response = await axios.put(`/api/jobs/${jobid}`, values);
      message.success(response.data.message);
      router.push("/jobs");
    } catch (error: any) {
      message.error(error.response.data.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  //fetch job to prepopulate the edit form
  const fetchJob = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(`/api/jobs/${jobid}`);
      message.success(response.data.message);
      setJobData(response.data.data);
    } catch (error: any) {
      message.error(error.response.data.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };
  useEffect(() => {
    fetchJob();
  }, []);
  return (
    jobData && (
      <div>
        <div className="flex justify-between items-center">
          <PageTitle title="Edit Job" />
          <Button onClick={() => router.push("/jobs")} type="default">
            Back
          </Button>
        </div>

        <Form layout="vertical" onFinish={onFinish} initialValues={jobData}>
          <JobPostForm />
          <div className="flex justify-end items-center my-3 gap-3">
            <Button onClick={() => router.back()} type="default">
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Edit Job
            </Button>
          </div>
        </Form>
      </div>
    )
  );
}

export default EditJob;
