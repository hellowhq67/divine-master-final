import React from "react";
import Navigation from "@/components/Navbar/Navigation";
import Footer from "@/components/Footer/Footer";

import { ToastContainer } from "react-toastify";
import Cartitmes from "../../components/cart/Cartitmes";
export default function page() {
  return (
    <div>
      <ToastContainer />
      <Navigation />
      <Cartitmes/>
      <Footer />
    </div>
  );
}
