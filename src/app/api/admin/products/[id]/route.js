import connectToDB from "@/database";
import { URL } from "url";
import { NextResponse } from "next/server";
import Product from "@/models/products";


export async function GET(request, { params }) {
    const { id } = params;
    await connectToDB();
    const products = await Product.findOne({ _id: id });
    return NextResponse.json({ products }, { status: 200 });
}
export async function  DELETE (req,{ params }){
    const { id } = params;
    const record = {_id:id}
    await connectToDB()
    const res = await Product.deleteOne(record)
    return NextResponse.json({res,success:true})
    
}