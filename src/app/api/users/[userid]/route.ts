import { connectDB } from "@/config/dbConfig";
import { validateJWT } from "@/helpers/validateJWT";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest, { params }: any) {
  try {
    // console.log("token", request.cookies.get("token"));
    //validate token
    await validateJWT(request);

    //get user
    const user = await User.findById(params.userid).select("-password");
    if (!user) {
      throw new Error("no user found in db");
    }
    return NextResponse.json({
      message: "User data fetched successfully",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      status: 500,
    });
  }
}
