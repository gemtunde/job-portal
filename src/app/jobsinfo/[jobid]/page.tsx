"use client";
import PageTitle from "@/components/PageTitle";
import { SetLoading } from "@/redux/loadersSlice";
import { Button, Col, Divider, Row, message } from "antd";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const JobInfo = () => {
  const [jobData, setJobData] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);

  //get current user from state
  const { currentUser } = useSelector((state: any) => state.users);

  //navigation
  const router = useRouter();
  //dispatch
  const dispatch = useDispatch();

  //params
  const { jobid } = useParams();

  //fetch jobs by id
  const fetchJob = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(`/api/jobs/${jobid}`);
      setJobData(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  //fetch applications by user-id and job-id
  const fetchApplications = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(
        `/api/applications?job=${jobid}&user=${currentUser._id}`
      );
      setApplications(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };
  //useeffect
  useEffect(() => {
    fetchJob();
    fetchApplications();
  }, []);

  //job apply
  const onApply = async () => {
    try {
      dispatch(SetLoading(false));
      const response = await axios.post("/api/applications", {
        user: currentUser._id,
        job: jobData._id,
        status: "pending",
      });
      message.success(response.data.message);
      router.push("/applications");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };
  return (
    jobData && (
      <div>
        <PageTitle title={jobData?.title} />
        <Row gutter={[16, 16]}>
          <Col span={12} className="flex flex-col gap-4">
            <div className="flex justify-between">
              <span>Company</span>
              <span>{jobData?.user?.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Location</span>
              <span>{jobData?.location}</span>
            </div>
            <div className="flex justify-between">
              <span>Salary Range</span>
              <span>
                N{jobData?.salaryFrom} - N{jobData?.salaryTo}{" "}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Work Mode</span>
              <span>{jobData?.workMode}</span>
            </div>
            <div className="flex justify-between">
              <span>Job Type</span>
              <span>{jobData?.jobType}</span>
            </div>
            <div className="flex justify-between">
              <span>Experience Required</span>
              <span>{jobData?.experience}</span>
            </div>
          </Col>
          <Col span={24} className="flex flex-col mt-4">
            {applications.length > 0 && (
              <span className="card p-3 my-2 info">
                You have already applied for this job. Please wait for the
                employer to respond.
              </span>
            )}
            <h4 className="text-md">Job Description</h4>
            <span>{jobData?.description}</span>

            <div className="flex justify-end items-center gap-3">
              <Button onClick={() => router.back()} type="default">
                Cancel
              </Button>
              <Button
                onClick={() => onApply()}
                type="primary"
                disabled={
                  currentUser?.userType === "employer" ||
                  applications.length > 0
                }
              >
                Apply
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    )
  );
};

export default JobInfo;
