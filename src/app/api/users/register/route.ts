import { NextRequest, NextResponse } from "next/server";

//get
export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "get register" });
}

//Post
export async function POST(request: NextRequest) {
  return NextResponse.json({ message: "post register" });
}
//Put
export async function PUT(request: NextRequest) {
  return NextResponse.json({ message: "pUt register" });
}
//delete
export async function DELETE(request: NextRequest) {
  return NextResponse.json({ message: "DELETE register" });
}
