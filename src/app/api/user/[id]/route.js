import { NextResponse } from "next/server";
import User from "@/models/User";
import connectMongoDB from "@/database/index";
export async function GET(request, { params }) {
    const { id } = params;
    await connectToDB();
    const  user = await User.findOne({ _id: id });
    return NextResponse.json({ user }, { status: 200 });
}
export async function DELETE(req, { params }) {
  const { id} = params;
  const record = { _id: id };
  await connectMongoDB();
  const res = await User.deleteOne(record);
  return NextResponse.json({ res, success: true });
}
export async function PATCH(request, { params }) {
    const { id } = params;
    const { role } = await request.json(); // Assumes role is sent in the request body
    
    await connectMongoDB();
    
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { isAdmin: role }, // Update the role or any other field
      { new: true } // Return the updated document
    );
  
    return NextResponse.json({ updatedUser }, { status: 200 });
  }