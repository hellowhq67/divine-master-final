import connectMongoDB from "@/database/index";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, email, isAdmin,profile, uid } = await request.json();
  await connectMongoDB();

  // Check if user already exists
  const existingUser = await User.findOne({ uid });
  if (existingUser) {
    return NextResponse.json({ message: "User already exists" }, { status: 409 });
  }

  // Create a new user
  await User.create({ name, email, isAdmin, profile, uid });
  return NextResponse.json({ message: "User Registered" }, { status: 201 });
}
