import { connectDB } from "@/config/dbConfig";
import { sendEmail } from "@/helpers/sendEmail";
import { validateJWT } from "@/helpers/validateJWT";
import Application from "@/models/applicationModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export async function PUT(request: NextRequest, { params }: any) {
  try {
    validateJWT(request);
    const reqBody = await request.json();
    const application: any = await Application.findByIdAndUpdate(
      params.applicationid,
      reqBody,
      {
        new: true,
        runValidators: true,
      }
    ).populate("user");
    //send mail
    await sendEmail({
      to: application.user.email,
      subject: "Your application status has been updated",
      text: `Your application status has been updated to ${application.status}`,
      html: `<div>      
            <p>Your application status has been updated to ${application.status}</p>
           <br />
           <p>Thank you for using GemTunde - Jobs</p>
            </div>`,
    });
    return NextResponse.json({
      message: "Application Status updated success",
      data: application,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
