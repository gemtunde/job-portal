import { connectDB } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";

//db connection
connectDB();
//Post
export async function POST(request: NextRequest) {
  return NextResponse.json({ message: "post register" });
}
