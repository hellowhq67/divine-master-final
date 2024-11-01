import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    email: String,
    name: String,
    isAdmin:String,
    profile:String,
    uid:String,
    
  
  
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
