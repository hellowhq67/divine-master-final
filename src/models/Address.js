import mongoose, { Schema, models } from "mongoose";

const AddressSchema = new Schema(
  {
  uid:String,
  fullName: String,
  address: String,
  state:String,
  city: String,
  country: String,
  postalCode: String,
  
  },
  { timestamps: true }
);

const Address = models.Address || mongoose.model("Address",AddressSchema);
export default Address;
