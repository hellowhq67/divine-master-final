import { NextResponse } from "next/server";
import Orders from "@/models/Orders";
import connectMongoDB from "@/database/index";

export async function GET(request, { params }) {
    const { id } = params;
  
    try {
      await connectMongoDB();
  
      // Retrieve the order by ID
      const order = await Orders.findById(id);
      if (!order) {
        return NextResponse.json({ message: "Order not found" }, { status: 404 });
      }
  
      return NextResponse.json({ order }, { status: 200 });
    } catch (error) {
      console.error("Error retrieving order:", error);
      return NextResponse.json(
        { message: "Error retrieving order", error: error.message },
        { status: 500 }
      );
    }
  }
  
  export async function PUT(request, { params }) {
    const { id } = params;
  
    try {
      await connectMongoDB();
  
      // Parse the request body
      const updateData = await request.json();
  
      // Update the order by ID
      const updatedOrder = await Orders.findByIdAndUpdate(id, updateData, {
        new: true,
      });
  
      if (!updatedOrder) {
        return NextResponse.json(
          { message: "Order not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        { message: "Order updated successfully", order: updatedOrder },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error updating order:", error);
      return NextResponse.json(
        { message: "Error updating order", error: error.message },
        { status: 500 }
      );
    }
  }