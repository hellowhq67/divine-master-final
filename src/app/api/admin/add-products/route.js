import { NextResponse } from "next/server";
import Product from "@/models/products";
import connectMongoDB from "@/database/index";
export async function POST(request) {
  try {
    await connectMongoDB();

    const {
      shippings,
      glodalshippings,
      productImage1,
      productImage2,
      productImage3,
      productImage4,
      productImage5,
      productName,
      sizes,
      color,
      price,
      smartPrice,
      priceUsd,
      date,
      description,
      department,
      category,
      subcetagory,
      isFeatured,
      freeShipping,
      cupon,
      usaShipping,
      europShipping,
      quantity,
      stock,
      sku,
      rating,
      costing,
      sells,
    } = await request.json();

    const newProduct = await Product.create({
      shippings,
      glodalshippings,
      productImage1,
      productImage2,
      productImage3,
      productImage4,
      productImage5,
      productName,
      sizes,
      color,
      price,
      smartPrice,
      priceUsd,
      date,
      description,
      department,
      category,
      subcetagory,
      isFeatured,
      freeShipping,
      cupon,
      usaShipping,
      europShipping,
      quantity,
      stock,
      sku,
      rating,
      costing,
      sells,
    });

    return NextResponse.json(
      { message: "Product Created", product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: "Error creating product", error: error.message },
      { status: 500 }
    );
  }
}
