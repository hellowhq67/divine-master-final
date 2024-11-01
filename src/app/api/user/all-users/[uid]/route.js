import connectMongoDB from "@/database/index";
import User from "@/models/User";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(request, { params }) {
  const { uid } = params;
  await connectMongoDB();
  const user = await User.findOne({ uid: uid });
  return NextResponse.json({ user }, { status: 200 });
}

export async function DELETE(req, { params }) {
  const { uid } = params;
  const record = { uid: uid };
  await connectMongoDB();
  const res = await User.deleteOne(record);
  return NextResponse.json({ res, success: true });
}

// Update method
export async function PATCH(req, { params }) {
  const { uid } = params;
  const body = await req.json(); // Extract the data from the request body
  await connectMongoDB();

  try {
    const updatedUser = await User.findOneAndUpdate({ uid: uid }, body, {
      new: true, // Return the updated document
    });

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Update failed", error }, { status: 500 });
  }
}
