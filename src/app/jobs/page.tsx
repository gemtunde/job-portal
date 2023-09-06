"use client";
import PageTitle from "@/components/PageTitle";
import { Button, Table, message } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { SetLoading } from "@/redux/loadersSlice";
import moment from "moment";

const Jobs = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);

  //set loading
  const dispatch = useDispatch();
  //fetch-jobs
  const fetchJobs = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get("/api/jobs");
      setJobs(response.data.data);
    } catch (error: any) {
      message.error(error.response.data.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  const columns = [
    { title: "Title", dataIndex: "title" },
    {
      title: "Posted On",
      dataIndex: "createdAt",
      render: (text: any) => moment(text).format("DD-MM-YY hh:mm A"),
    },
    { title: "Location", dataIndex: "location" },
    { title: "Job Type", dataIndex: "jobType" },
    { title: "Work Mode", dataIndex: "workMode" },
    { title: "Experience", dataIndex: "experience" },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text: any, record: any) => (
        <div className="flex gap-3">
          <i className="ri-delete-bin-line"></i>
          <i
            className="ri-pencil-line"
            onClick={() => router.push(`/jobs/edit/${record._id}`)}
          ></i>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchJobs();
  }, []);
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Jobs" />
        <Button onClick={() => router.push("/jobs/new")} type="primary">
          New Job
        </Button>
      </div>
      <div className="my-2">
        <Table columns={columns} dataSource={jobs} />
      </div>
    </div>
  );
};

export default Jobs;
