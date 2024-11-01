import React from "react";
import Link from "next/link";


function Header() {
  return (
    <div className="bg-black text-white flex items-center p-2   justify-center lg:gap-40 p- sm:gap-1 w-screen"> 
        <Link className=' hover:underline text-sm font-sans font-bold' href={`/products`}>
          Free delivery Over 3 Products
        </Link>
        <Link className=' hover::underline text-sm font-sans font-bold' href={`/regiseter`}>
          Welcome Offer 20% off
        </Link>
        <Link className=' hover:underline text-sm font-sans font-bold' href={`/products`}>DIVINE DAY IS HEAR</Link>
    </div>
  );
}

export default Header;
