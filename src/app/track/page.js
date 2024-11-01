"use client";
import React, { useState } from "react";
import Navigation from "@/components/Navbar/Navigation";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import Footer from "@/components/Footer/Footer";

import style from './style.module.css'
function page() {
  const [code, SetCode] = useState("");
  const [id,setOrderId]=useState('')
  return (
    <>
      <ToastContainer />
      <Navigation />
      <div className={style.banner}>
        <div className={style.trackBox}>
          <input
            type="text"
            onChange={(e) => SetCode(e.target.value)}
            required
            placeholder="Tack Code"
          />
          <input
            type="text"
            onChange={(e) => setOrderId(e.target.value)}
            required
            placeholder="Order Id Code"
          />
          <Link className={style.trackBtn} href={`/track/${code}/${id}`}>
            {" track"}
            
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default page;
