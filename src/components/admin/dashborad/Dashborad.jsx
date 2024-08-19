"use client";
import Sidebar from "@/components/admin/sidebar/Sidebar";
import React, { useState, useEffect } from "react";
import ProductTable from "../tabels/ProductTabel";
import { UseAuth } from "@/app/context/AuthContext";
import Navigation from "@/components/admin/navigation/Navigation";

export default function Dasborad() {
  return (
    <>
      <Sidebar />

      <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          
        </div>
      </div>
    </>
  );
}
