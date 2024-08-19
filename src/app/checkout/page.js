import React from 'react'
import Nav from "@/components/Navbar/Nav";
import Footer from "@/components/Footer/Footer";

import Products from "@/components/all product/Products";
import Checkout from "@/components/checkout/Checkout";


export default function page() {
  return (
    <div>
        <Nav/>
        <Checkout/>
      
    </div>
  )
}
