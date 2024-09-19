"use client";
import UserTabel from "../../../components/admin/tabels/UserTabel";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { UseAuth } from "@/app/context/AuthContext";
import axios from "axios";
import Restrict from "@/components/admin/Restrict";
export default function Page() {
  const { user } = UseAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const userId = user ? user.uid : null;
  useEffect(() => {
    const checkAuthentication = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(`/api/user/all-users/${userId}`);
        setUsers(response.data.user);
        console.log(response.data.user);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!users || users.isAdmin !== "Admin") {
    return <Restrict />;
  }

  return (
    <div>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <UserTabel />
        </div>
      </div>
    </div>
  );
}
