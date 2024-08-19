import { NextResponse } from "next/server";
import Orders from "@/models/Orders";
import connectMongoDB from "@/database/index";

export async function GET() {
  try {
    // Connect to the MongoDB database
    await connectMongoDB();

    // Retrieve all orders from the Orders collection
    const orders = await Orders.find({});

    // Return a success response with the retrieved orders
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    // Log and return an error response in case of failure
    console.error("Error retrieving orders:", error);
    return NextResponse.json(
      { message: "Error retrieving orders", error: error.message },
      { status: 500 }
    );
  }
}
export async function POST(request) {
  try {
    const tran_id = (Math.floor(100000 + Math.random() * 900000)).toString();
    await connectMongoDB();

    // Parse the JSON data from the request body
    const {
      uid,
      total_amount, // The total amount to be paid
      currency, // Currency for the transaction
      cus_name, // Customer's name
      cus_email, // Customer's email
      cus_add1, // Customer's address line 1
      cus_add2, // Customer's address line 2
      cus_city, // Customer's city
      cus_state, // Customer's state
      cus_postcode, // Customer's postcode
      cus_country, // Customer's country
      cus_phone, // Customer's phone number
      cus_fax, // Customer's fax number (optional)
      shipping_method, // Shipping method
      ship_name, // Shipping name
      ship_add1, // Shipping address line 1
      ship_add2, // Shipping address line 2
      ship_city, // Shipping city
      ship_state, // Shipping state
      ship_postcode, // Shipping postcode
      ship_country, // Shipping country// Name of the product
      products,
      paymentStatus,
      OrderStatus,
    } = await request.json();

    // Create a new order using the Orders model
    const newOrder = await Orders.create({
      uid,
      total_amount, // The total amount to be paid
      currency, // Currency for the transaction
      cus_name, // Customer's name
      cus_email, // Customer's email
      cus_add1, // Customer's address line 1
      cus_add2, // Customer's address line 2
      cus_city, // Customer's city
      cus_state, // Customer's state
      cus_postcode, // Customer's postcode
      cus_country, // Customer's country
      cus_phone, // Customer's phone number
      cus_fax, // Customer's fax number (optional)
      shipping_method, // Shipping method
      ship_name, // Shipping name
      ship_add1, // Shipping address line 1
      ship_add2, // Shipping address line 2
      ship_city, // Shipping city
      ship_state, // Shipping state
      ship_postcode, // Shipping postcode
      ship_country, // Shipping country// Name of the product
      products,

      paymentStatus,
      OrderStatus,
    });

    // Return a success response with the created order
    return NextResponse.json(
      { message: "Order Created", orders: newOrder },
      { status: 201 }
    );
  } catch (error) {
    // Log and return an error response in case of failure
    console.error("Error creating order:", error);
    return NextResponse.json(
      { message: "Error creating order", error: error.message },
      { status: 500 }
    );
  }
}
