"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch } from 'react-redux';
import { add } from '@/redux/Cartslice';
import "./style.css";
export default function Featured() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  useEffect(() => {
    // Fetch products data from your API endpoint
    fetch("/api/admin/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products.filter((product) => product.isFeatured));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);
  const handleadd =(product)=>{
    dispatch(add(product));
 }


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
      </div>
    );
  }

  return (
    <div className=" flex flex-col items-center ">
      <h2 className="  my-4 text-4xl font-bold tracking-tight text-gray-900 text-center">
        Customers also purchased
      </h2>
      <div className=" w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {products.map((product, index) => (
        <div class="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <a href="#">
            <img  class="h-80 w-72 object-cover rounded-t-xl" src={product.productImage1} alt="image"/>
    
            <div class="px-4 py-3 w-72">
                <span class="text-gray-400 mr-3 uppercase text-xs">DIVINE</span>
                <p class="text-lg font-bold text-black truncate block capitalize">{product.productName.slice(0,21)}...</p>
                <div class="flex items-center">
                  {!product.smartPrice?(
                      <p class="text-lg font-semibold text-black cursor-auto my-3">{product.price} BTD</p>
                  ):(
                    <>
                        <p class="text-lg font-semibold text-black cursor-auto my-3">{product.smartPrice}BTD</p>
                    <del>
                        <p class="text-sm text-gray-600 cursor-auto ml-2">{product.price} BTD</p>
                    </del>
                    </>
                  )

                  }
                
                    <button onClick={()=>handleadd(product)} class="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                            fill="currentColor" class="bi bi-bag-plus" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                            <path
                                d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                        </svg></button>
                </div>
            </div>
        </a>
    </div>
        ))}
      </div>
      <Link className="text-center text-2xl font-bold  underline my-4" href={`/products`}>VIEW MORE</Link>
    </div>
  );
}

const tailwindCSSLoader = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.loader {
  animation: spin 1s linear infinite;
  border-color: #3b82f6 transparent #3b82f6 transparent;
}
`;

export const TailwindCSSLoaderStyle = () => (
  <style jsx global>
    {tailwindCSSLoader}
  </style>
);
