import React from "react";
import Nav from "@/components/Navbar/Nav";
import Footer from "@/components/Footer/Footer";
import Favorite from "../../components/Favorite/Favorite";
import { ToastContainer } from "react-toastify";
export default function page() {
  return (
    <div>
      <ToastContainer />
      <Nav />
      <Favorite />
      <Footer />
    </div>
  );
}
