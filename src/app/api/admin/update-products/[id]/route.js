import { NextResponse } from "next/server";
import Product from "@/models/products";
import connectMongoDB from "@/database/index";

export async function PUT(req, { params }) {
  const { id } = params;

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
      sku,
      rating,
      costing,
      sells,
    } = await req.json();

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
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
        sku,
        rating,
        costing,
        sells,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product updated", product: updatedProduct },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { message: "Error updating product", error: error.message },
      { status: 500 }
    );
  }
}
