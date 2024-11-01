"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFavorites } from "@/redux/favoritesSlice";
import Sidebar from "../sidebar/Sidebar";

export default function Favorite() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites); // Access the favorites state

  const handleRemoveFromFavorites = (productId) => {
    dispatch(removeFromFavorites(productId));
  };

  return (
    <div className="flex items-start">
      <Sidebar />

      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Your Favorites</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.length > 0 ? (
            favorites.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
              >
                <img
                  src={product.productImage1}
                  alt={product.productName}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <h3 className="text-lg font-medium">{product.productName}</h3>
                <p className="text-gray-500 mt-2">
                  Tk{!product.smartPrice ? product.price : product.smartPrice}
                </p>
                <button
                  onClick={() => handleRemoveFromFavorites(product._id)}
                  className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Remove from Favorites
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No favorite products added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
