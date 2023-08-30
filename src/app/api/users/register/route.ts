import { connectDB } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

//db connection
connectDB();
//Post
export async function POST(request: NextRequest) {
  try {
    //convert to json
    const reqBody = await request.json();

    //check if email exists
    const user = await User.findOne({ email: reqBody.email });
    if (user) {
      throw new Error("User already exists");
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(reqBody.password, salt);
    reqBody.password = hashPassword;

    //create user
    await User.create(reqBody);
    return NextResponse.json(
      { message: "User created Successfully", success: true },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
