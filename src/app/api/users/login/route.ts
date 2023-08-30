import { connectDB } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//conectdb
connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    //check if user exist
    const user = await User.findOne({ email: reqBody.email });
    if (!user) {
      throw new Error("User not found");
    }

    //compare password
    const validPassword = await bcrypt.compare(reqBody.password, user.password);
    if (!validPassword) {
      throw new Error("Invalid Password");
    }

    //create token
    const dataToSign = {
      id: user._id,
      email: user.email,
    };
    const token = jwt.sign(dataToSign, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    //do not send token in the response
    const response = NextResponse.json({
      message: "Login Success",
      status: 200,
    });

    //set cookies to send token
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000, //1 day
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
