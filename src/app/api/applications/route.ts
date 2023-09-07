import { connectDB } from "@/config/dbConfig";
import { validateJWT } from "@/helpers/validateJWT";
import Application from "@/models/applicationModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
  try {
    await validateJWT(request);
    const reqBody = await request.json();
    const application = await Application.create(reqBody);

    return NextResponse.json({
      message: "Job Application created successfully",
      data: application,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    validateJWT(request);

    //fetch query using string/search params
    const { searchParams } = new URL(request.url);
    const user = searchParams.get("user");
    const job = searchParams.get("job");

    const filterObject: any = {};
    if (user) {
      filterObject["user"] = user;
    }
    if (job) {
      filterObject["job"] = job;
    }

    const applications = await Application.find(filterObject)
      .populate("user")
      .populate("job");
    return NextResponse.json({
      message: "job application fetched successfully",
      data: applications,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
