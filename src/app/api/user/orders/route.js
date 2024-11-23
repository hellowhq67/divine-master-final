import { NextResponse } from "next/server";
import Orders from "@/models/Orders";
import connectMongoDB from "@/database/index";
import crypto from "crypto";
export async function GET(req) {
  try {
    // Connect to the MongoDB database
    await connectMongoDB();

    // Get query parameters for pagination
    const page = parseInt(req.headers.get("page") || "1", 10); // Extract page from headers
    const limit = parseInt(req.headers.get("limit") || "10", 10); // Extract limit from headers

    // Calculate the starting index
    const startIndex = (page - 1) * limit;

    // Retrieve orders with pagination
    const orders = await Orders.find({})
      .skip(startIndex)
      .limit(limit)
      .exec();

    // Get total count of orders
    const totalOrders = await Orders.countDocuments();

    // Calculate additional values
    const allOrders = await Orders.find({});
    const totalSales = allOrders.reduce((acc, order) => acc + order.total_amount, 0);
    const totalProfit = allOrders.reduce(
      (acc, order) =>
        acc +
        order.products.reduce(
          (prodAcc, prod) =>
            prodAcc + (!prod.smartPrice ? prod.price : prod.smartPrice - prod.costing) * prod.quantity,
          0
        ),
      0
    );

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const lastWeekSales = allOrders
      .filter(order => new Date(order.createdAt) >= oneWeekAgo)
      .reduce((acc, order) => acc + order.total_amount, 0);

    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const thisMonthSales = allOrders
      .filter(order => new Date(order.createdAt) >= startOfMonth)
      .reduce((acc, order) => acc + order.total_amount, 0);

    // Return a success response with the retrieved orders, pagination info, and additional values
    return NextResponse.json(
      {
        orders,
        allOrders,
        currentPage: page,
        totalPages: Math.ceil(totalOrders / limit),
        totalOrders,
        totalSales,
        totalProfit,
        lastWeekSales,
        thisMonthSales,
      },
      { status: 200 }
    );
  } catch (error) {
    // Log and return an error response in case of failure
    console.error("Error retrieving orders:", error);
    return NextResponse.json(
      { message: "Error retrieving orders", error: error.message },
      { status: 500 }
    );
  }
}

 // Import crypto

export async function POST(req) {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Get the data from the request body
    const body = await req.json();
    
    // Extract order details from the request body
    const {
      uid,
      total_amount,
      currency,
      cus_name,
      cus_email,
      cus_add1,
      cus_add2,
      cus_city,
      cus_state,
      cus_postcode,
      cus_country,
      cus_phone,
      cus_fax,
      shipping_method,
      ship_name,
      ship_add1,
      ship_add2,
      ship_city,
      ship_state,
      ship_postcode,
      ship_country,
      products,
      paymentStatus,
      OrderStatus,
    } = body;

    // Generate a unique transaction ID (tran_id) using crypto
    const tran_id = crypto.randomBytes(16).toString("hex");

    // Create a new order object with the generated tran_id
    const newOrder = new Orders({
      uid,
      total_amount,
      currency,
      cus_name,
      cus_email,
      cus_add1,
      cus_add2,
      cus_city,
      cus_state,
      cus_postcode,
      cus_country,
      cus_phone,
      cus_fax,
      shipping_method,
      ship_name,
      ship_add1,
      ship_add2,
      ship_city,
      ship_state,
      ship_postcode,
      ship_country,
      products,
      paymentStatus,
      OrderStatus,
      tran_id, // Add tran_id to the order
    });

    // Save the new order to the database
    await newOrder.save();

    // Return a success response
    return NextResponse.json(
      {
        message: "Order created successfully",
        order: newOrder,
      },
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
