import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const validateJWT = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      throw new Error("No token found");
    }
    const decodeToken: any = jwt.verify(token, process.env.JWT_SECRET!);
    const { id } = decodeToken;
    return id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
