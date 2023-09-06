"use client";
import PageTitle from "@/components/PageTitle";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

function NewJob() {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center">
      <PageTitle title="Post New Jobs" />
      <Button onClick={() => router.push("/jobs")} type="primary">
        Back
      </Button>
    </div>
  );
}

export default NewJob;
