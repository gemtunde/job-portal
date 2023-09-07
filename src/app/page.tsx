"use client";
import React, { useEffect, useState } from "react";
import { SetLoading } from "@/redux/loadersSlice";
import { Button, Col, Divider, Row, Space, message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

function Home() {
  //store response in state
  const [jobs, setJobs] = useState([]);

  //navigation
  const router = useRouter();

  const dispatch = useDispatch();
  const fetchJobs = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get("/api/jobs");
      setJobs(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  return (
    <div>
      <h2>Job portal</h2>
      <Row gutter={[16, 16]} className="gap-3">
        {jobs.map((job: any, index) => (
          <Col
            span={7}
            className="card flex flex-col gap-2 cursor-pointer"
            key={index}
            onClick={() => router.push(`/jobsinfo/${job._id}`)}
          >
            <h1 className="text-md">{job.title}</h1>
            <Divider />
            <div className="flex justify-between">
              <span>Company</span>
              <span>{job.user.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Location</span>
              <span>{job.location}</span>
            </div>
            <div className="flex justify-between">
              <span>Salary Range</span>
              <span>
                N{job.salaryFrom} - N{job.salaryTo}{" "}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Work Mode</span>
              <span>{job.workMode}</span>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
export default Home;
