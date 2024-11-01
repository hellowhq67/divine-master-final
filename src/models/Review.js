import mongoose, { Schema, models } from "mongoose";

const reviewSchema = new Schema(
  {
    email: String,
    uid:String,
    productId:String,
    text:String,
    rating:Number,
    userName:String,
    
  
  
  },
  { timestamps: true }
);

const Review = models.Review || mongoose.model("Review",reviewSchema);
export default Review;
