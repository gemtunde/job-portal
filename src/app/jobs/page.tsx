"use client";
import PageTitle from "@/components/PageTitle";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const Jobs = () => {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center">
      <PageTitle title="Jobs" />
      <Button onClick={() => router.push("/jobs/new")} type="primary">
        New Job
      </Button>
    </div>
  );
};

export default Jobs;
