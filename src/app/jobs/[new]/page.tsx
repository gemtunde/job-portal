"use client";
import JobPostForm from "@/components/JobPostForm";
import PageTitle from "@/components/PageTitle";
import { Button, Form } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

function NewJob() {
  const router = useRouter();
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Post New Jobs" />
        <Button onClick={() => router.push("/jobs")} type="default">
          Back
        </Button>
      </div>

      <Form layout="vertical">
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
