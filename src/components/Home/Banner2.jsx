"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import style from "./style.module.css";

export default function Banner2() {
  return (
    <div className={style.bannerConteiner2}>
      <div className={style.bannerTextConteiner2}>
        <h1 className={style.title}>DIVINE GRAND OPENING <br /> </h1>
        <Link href={`/products`}className={style.subtitle2}>SHOP NOW  <br /> </Link>

      
     
      </div>
    </div>
  );
}
