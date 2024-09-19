'use client'
import Loder from '@/components/loder/Loder'
import OrderUpdate from '../../../../../components/admin/Form/OrderUpdate'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { UseAuth } from "@/app/context/AuthContext";
import axios from "axios";
import Restrict from '@/components/admin/Restrict'
export default function page({ params: { _id } }) {
  const { user } = UseAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
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
    <div>
      <OrderUpdate orderID={_id}/>
    </div>
  )
}
