import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    uid: String,
    total_amount: Number, // The total amount to be paid
    currency: String, // Currency for the transaction
    cus_name: String, // Customer's name
    cus_email: String, // Customer's email
    cus_add1: String, // Customer's address line 1
    cus_add2: String, // Customer's address line 2
    cus_city: String, // Customer's city
    cus_state: String, // Customer's state
    cus_postcode: String, // Customer's postcode
    cus_country: String, // Customer's country
    cus_phone: String, // Customer's phone number
    cus_fax: String, // Customer's fax number (optional)
    shipping_method: String, // Shipping method
    ship_name: String, // Shipping name
    ship_add1:String, // Shipping address line 1
    ship_add2: String, // Shipping address line 2
    ship_city: String, // Shipping city
    ship_state: String, // Shipping state
    ship_postcode: String, // Shipping postcode
    ship_country: String, 
    products:Array, 
    paymentStatus:String,
    OrderStatus:String,
    tran_id: { type: String, unique: true, sparse: true }, 
  },
  { timestamps: true }
);

const Orders = mongoose.models.Orders || mongoose.model("Orders", orderSchema);

export default Orders;
