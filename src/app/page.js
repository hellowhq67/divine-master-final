// app/page.js
"use client";

import { useState, useEffect } from "react";
import Nav from "@/components/Navbar/Nav";
import Banner from "@/components/Home/Banner";
import Poster from "@/components/Home/Poster";
import Featured from "@/components/Home/Featured";
import Footer from "@/components/Footer/Footer";
import Banner2 from "@/components/Home/Banner2";
import Fetured from "@/components/Fetured/Fetured";

export default function Home() {

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const response = await fetch("/api/visitor-count");
        const data = await response.json();
     
      } catch (error) {
        console.error("Error fetching visitor count:", error);
      }
    };

    fetchVisitorCount();
  }, []);

  return (
    <>
      <Nav />
      <div className="my-14">
        <Banner />
        <Poster />
        <Featured />
        <Fetured />
        <Banner2 />
      </div>
     
      <Footer />
    </>
  );
}
