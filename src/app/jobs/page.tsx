"use client";
import PageTitle from "@/components/PageTitle";
import { Button, Table, Tooltip, message } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SetLoading } from "@/redux/loadersSlice";
import moment from "moment";
import Applications from "@/components/Applications";

const Jobs = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [selectedjob, setSelectedJob] = useState<any>({});
  const [showApplications, setShowApplications] = useState<boolean>(false);
  const { currentUser } = useSelector((state: any) => state.users);
  //set loading
  const dispatch = useDispatch();
  //fetch-jobs
  const fetchJobs = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(`/api/jobs?user=${currentUser._id}`);
      setJobs(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };
  //delete job
  const onDelete = async (jobid: any) => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.delete(`/api/jobs/${jobid}`);
      message.success(response.data.message);
      fetchJobs();
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
          <Tooltip title="Delete">
            {" "}
            <i
              className="ri-delete-bin-line"
              onClick={() => onDelete(record._id)}
            ></i>
          </Tooltip>
          <Tooltip title="Edit">
            <i
              className="ri-pencil-line"
              onClick={() => router.push(`/jobs/edit/${record._id}`)}
            ></i>
          </Tooltip>
          <Tooltip title="View Applications">
            <i
              className="ri-file-list-3-line"
              onClick={() => {
                setSelectedJob(record);
                setShowApplications(true);
              }}
            ></i>
          </Tooltip>
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
      {showApplications && (
        <Applications
          selectedJob={selectedjob}
          setShowApplications={setShowApplications}
          showApplications={showApplications}
        />
      )}
    </div>
  );
};

export default Jobs;
