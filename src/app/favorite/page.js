import React from "react";
import Navigation from "@/components/Navbar/Navigation";
import Footer from "@/components/Footer/Footer";
import Favorite from "../../components/Favorite/Favorite";
import { ToastContainer } from "react-toastify";
export default function page() {
  return (
    <div>
      <ToastContainer />
      <Navigation />
      <Favorite />
      <Footer />
    </div>
  );
}
