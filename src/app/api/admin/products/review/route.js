import { NextRequest,NextResponse } from "next/server";
import connectToDB from "@/database";
import Review from '@/models/Review'
export const dynamic = "force-dynamic";

export async function GET(request) {
    try{
       await connectToDB();
       const review = await Review.find()
       const totalReview= await Review.countDocuments();
       return NextResponse.json({
        review,
        totalReview,
       })
    }catch(error){
        console.error("Error fetching review:", error);
        return NextResponse.json({ error: "Error fetching reviews" }, { status: 500 });
    }
    
}
export async function POST(request) {
    try{
        await connectToDB()
        const {email,uid,productId,text,rating,userName}=await request.json();
        const review = await Review.create({email,uid,productId,text,rating,userName})
        return NextResponse.json({ message: "Review Posted" }, { status: 201 })

    }catch(error){
        console.error("Error fetching review:", error);
    return NextResponse.json({ error: "Error fetching review" }, { status: 500 });
    }
}