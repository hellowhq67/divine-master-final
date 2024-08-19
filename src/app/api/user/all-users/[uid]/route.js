import connectMongoDB from "@/database/index";
import User from "@/models/User";
import { NextResponse } from "next/server";
export async function GET(request, { params }) {
  const { uid } = params;
  await connectMongoDB();
  const user= await User.findOne({ uid: uid});
  return NextResponse.json({ user }, { status: 200 });
}
export async function DELETE(req, { params }) {
  const { uid} = params;
  const record = { uid: uid };
  await connectMongoDB();
  const res = await User.deleteOne(record);
  return NextResponse.json({ res, success: true });
}

