import { NextResponse } from "next/server";
import Product from "@/models/products";
import connectMongoDB from "@/database/index";

export async function DELETE(req, { params }) {
  const { id} = params;
  const record = { _id: id };
  await connectMongoDB();
  const res = await Product.deleteOne(record);
  return NextResponse.json({ res, success: true });
}

