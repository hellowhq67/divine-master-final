"use client";

import style from "./style.module.css";
import React, { useRef, useState } from "react";
import Img1 from "@/components/Home/assests/img33.jpg";
import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  const data = {
    Image: Img1,
    title: "",
    link: "/product",
    link2: "/",
  };
  return (
    <div className={style.bannerMain}>
      <div className={style.Description}>
        <h1 className="text-2xl font-sans font-semibold">{data.title}</h1>
        <div className="flex ">
          <Link
            href={data.link}
            className={`${style.btn} " bg-white flex items-center w-full  text-sm text-black mx-1 py-3 px-6 shadow-lg font-bold"
          >`}>
            {" "}
            SHOP NOW{" "}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
</svg>

          </Link>
        </div>
      </div>
    </div>
  );
}
