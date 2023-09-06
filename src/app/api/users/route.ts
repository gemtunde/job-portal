import { connectDB } from "@/config/dbConfig";
import { validateJWT } from "@/helpers/validateJWT";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

//connect db
connectDB();

export async function PUT(request: NextRequest) {
  try {
    await validateJWT(request);
    const reqBody = await request.json();
    const updateUser = await User.findByIdAndUpdate(reqBody._id, reqBody, {
      new: true,
    }).select("-password");

    if (!updateUser) {
      throw new Error("no user found");
    }
    return NextResponse.json({
      message: "user profile data updated successfully",
      data: updateUser,
    });
  } catch (error: any) {
    NextResponse.json(
      { message: error.message },
      {
        status: 403,
      }
    );
  }
}
