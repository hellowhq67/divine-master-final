import connectMongoDB from "@/database/index";
import Address from "@/models/Address";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { uid, fullName, address, state, city, country, postalCode } =
      await request.json();
    await connectMongoDB();
    const newAddress = await Address.create({
      uid, fullName, address, state, city, country, postalCode
    });
    return NextResponse.json(
      { message: "Address Added", Address: newAddress },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating adreess:", error);
    return NextResponse.json(
      { message: "Please fill all information", error: error.message },
      { status: 500 }
    );
  }
}
