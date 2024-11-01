import connectMongoDB from "@/database/index";
import Address from "@/models/Address";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const { id} = params;
  const record = { _id: id };
  await connectMongoDB();
  const res = await Address.deleteOne(record);
  return NextResponse.json({ res, success: true });
}


