"use client";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/admin/sidebar/Sidebar";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
} from "@mui/material";

function Billing() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // For Material UI pagination (starts from 0)
  const [totalPages, setTotalPages] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page

  useEffect(() => {
    const fetchOrders = async (page = 1) => {
      try {
        const response = await fetch(
          `/api/user/orders?page=${page + 1}&limit=${rowsPerPage}` // Adjust to 1-based index for API
        );
        const data = await response.json();
        setOrders(data.orders);
        setCurrentPage(data.currentPage - 1); // For 0-based index
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        toast.error("Failed to load orders.");
      }
    };

    fetchOrders(currentPage);
  }, [currentPage, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0); // Reset to first page when rows per page change
  };

  const handelInvoice = (email, name, status) => {
    console.log("data", email, name, status);
  };

  return (
    <>
      <Sidebar />
      <ToastContainer />
      <div className="p-4 sm:ml-64">
       
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
     
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Customer Email</TableCell>
                  <TableCell>Total Amount</TableCell>
                  <TableCell>User Name</TableCell>
                  <TableCell>Payment Status</TableCell>
                  <TableCell>Order Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order.cus_email}</TableCell>
                    <TableCell>{order.total_amount}</TableCell>
                    <TableCell>{order.cus_name}</TableCell>
                    <TableCell>{order.paymentStatus}</TableCell>
                    <TableCell>{order.OrderStatus}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() =>
                          handelInvoice(
                            order.cus_email,
                            order.cus_name,
                            order.OrderStatus
                          )
                        }
                      >
                        <Link href={`/admin/orders/order-update/${order._id}`}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-pencil-square"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                              fillRule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                            />
                          </svg>
                        </Link>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Material UI Pagination */}
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalPages * rowsPerPage}
              rowsPerPage={rowsPerPage}
              page={currentPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </div>
      </div>
    </>
  );
}

export default Billing;
