'use client';
import Dasborad from '@/components/admin/dashborad/Dashborad';
import React, { useEffect, useState } from "react";
import { UseAuth } from "@/app/context/AuthContext";
import axios from "axios";
import Restrict from '@/components/admin/Restrict';
import Loder from '@/components/loder/Loder'; // Correct typo
export const dynamic = "force-dynamic";

export default function Page() {
  const { user } = UseAuth();
  const [currentUser, setCurrentUser] = useState(null); // Use to store the current user
  const [loading, setLoading] = useState(true);
  const userId = user ? user.uid : null;

  useEffect(() => {
    const checkAuthentication = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/api/user/all-users/${userId}`);
        setCurrentUser(response.data.user); // Store the specific user
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

  // Ensure you're checking if the user is an admin
  if (!currentUser || currentUser.isAdmin !== "Admin") {
    return <Restrict />;
  }

  return (
    <>
      <Dasborad />
    </>
  );
}
