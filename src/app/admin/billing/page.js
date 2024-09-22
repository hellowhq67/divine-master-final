'use client';
import Billing from "@/components/admin/tabels/Billing";
import React, { useEffect, useState } from "react";
import { UseAuth } from "@/app/context/AuthContext";
import axios from "axios";
import Restrict from "@/components/admin/Restrict";
import Loder from "@/components/loder/Loder";

// Force dynamic rendering to avoid server-side errors
export const dynamic = "force-dynamic";

export default function Page() {
  const { user } = UseAuth();
  const [currentUser, setCurrentUser] = useState(null); // Track current user
  const [loading, setLoading] = useState(true);
  const userId = user ? user.uid : null;

  useEffect(() => {
    const checkAuthentication = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(`/api/user/all-users/${userId}`);
        setCurrentUser(response.data.user); // Set the current user
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
    return <Loder />;
  }

  // If the user is not admin, restrict access
  if (!currentUser || currentUser.isAdmin !== "Admin") {
    return <Restrict />;
  }

  return (
    <>
      {typeof window !== 'undefined' &&   <Billing />} 
    
    </>
  );
}
