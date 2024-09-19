import React from "react";
import Nav from "@/components/Navbar/Nav";
import Footer from "@/components/Footer/Footer";

import { ToastContainer } from "react-toastify";
import Cartitmes from "../../components/cart/Cartitmes";
export default function page() {
  return (
    <div>
      <ToastContainer />
      <Nav />
      <Cartitmes/>
      <Footer />
    </div>
  );
}
