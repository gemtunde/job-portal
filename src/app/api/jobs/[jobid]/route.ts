import { connectDB } from "@/config/dbConfig";
import { validateJWT } from "@/helpers/validateJWT";
import Job from "@/models/jobModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function PUT(request: NextRequest, { params }: any) {
  try {
    validateJWT(request);
    const reqBody = await request.json();
    const job = await Job.findByIdAndUpdate(params.jobid, reqBody, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json({
      message: "Job Updated successfully",
      data: job,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

//get single job by id
export async function GET(request: NextRequest, { params }: any) {
  try {
    validateJWT(request);
    const job = await Job.findById(params.jobid).populate("user");
    return NextResponse.json({
      message: "job fetched successfully",
      data: job,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
//Delete single job by id
export async function DELETE(request: NextRequest, { params }: any) {
  try {
    validateJWT(request);
    const job = await Job.findByIdAndDelete(params.jobid);
    return NextResponse.json({
      message: "job deleted successfully",
      data: job,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
