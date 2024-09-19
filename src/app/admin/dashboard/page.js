'use client'
import Dasborad from "@/components/admin/dashborad/Dashborad";
import Sidebar from "@/components/admin/sidebar/Sidebar";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { UseAuth } from "@/app/context/AuthContext";
import axios from "axios";
import Restrict from '@/components/admin/Restrict'
import Loder from "@/components/loder/Loder";
export default function Page() {
  const { user } = UseAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const userId = user?user.uid:null;
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
    return <Loder/>;
  }

  if (!users || users.isAdmin !== "Admin") {
    return <Restrict/>;
  }


  return (
    <>
      <Dasborad/>
    </>
  );
}
