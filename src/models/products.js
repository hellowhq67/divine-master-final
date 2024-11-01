import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  shippings: Number,
  glodalshippings: Number,
  productImage1: String,
  productImage2: String,
  productImage3: String,
  productImage4: String,
  productImage5: String,
  productName: String,
  sizes: Array,
  color: String,
  price: Number,
  smartPrice:Number,
  priceUsd:Number,
  date:String,
  description: String,
  department:String,
  category: String,
  subcetagory:String,
  isFeatured: Boolean,
  freeShipping:Boolean,
  cupon:String,
  usaShipping:Number,
  europShipping:Number,
  quantity:Number,
  stock:Number,
  cupon:String,
  sku:String,
  rating:Number,
  costing:Number,
  sells:Number,

},{ timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product