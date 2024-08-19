"use client";
import { useState, useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import Navigation from "@/components/admin/navigation/Navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [open, setOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [desc, setDesc] = useState("");
  const [sku, setSku] = useState("");
  const [shipping, setShipping] = useState(0);
  const [shippingGlobal, setShippingGlobal] = useState(0);
  const [shippingUSA, setShippingUSA] = useState(0);
  const [shippingERU, setShippingERU] = useState(0);
  const [date, SetDate] = useState("");
  const [cupon, setCupon] = useState("");
  const [color, setColor] = useState("");
  const [priceUSD, setPriceUSD] = useState(0);
  const [price, setPrice] = useState(0);
  const [smartprice, setsmartPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const [enabled1, setEnabled1] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [imageUrl3, setImageUrl3] = useState("");
  const [imageUrl4, setImageUrl4] = useState("");
  const [imageUrl5, setImageUrl5] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [department, setDepartment] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchProducts = async (page = 1, limit = 10) => {
    try {
      const response = await fetch(
        `/api/admin/products?page=${page}&limit=${limit}`
      );
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(data.totalPages); // Assume your API returns the total number of pages
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectProduct = (id) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((productId) => productId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map((product) => product._id));
    }
  };

  const handleEdit = (id) => {
    // Implement edit functionality
    console.log("Edit product with ID:", id);
  };

  const handleDelete = async (id) => {
    console.log("Delete product with ID:", id);

    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/delete-products/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // If the response is OK, remove the product from the state
        setProducts(products.filter((product) => product.id !== id));
        toast.success(`Product with ID ${id} deleted successfully.`);
      } else {
        console.error(`Failed to delete product with ID ${id}.`);
      }
    } catch (error) {
      console.error(`An error occurred while deleting the product: ${error}`);
    }
  };

  const handleView = (id) => {
    // Implement view functionality
    console.log("View product with ID:", id);
  };

  return (
    <>
      <Sidebar />
      <ToastContainer />
      <div>
        <Navigation />

        <div class="p-4 sm:ml-64">
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Add a new product
                  </h2>
                </Typography>
                <Typography
                  id="transition-modal-description"
                  sx={{ mt: 2 }}
                ></Typography>
              </Box>
            </Fade>
          </Modal>
          <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
            <div class=" border-2 border-gray-200 flex items-center justify-center h-100 mb-4 rounded bg-gray-50 dark:bg-gray-800">
              <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border p-2 rounded"
                  />
                </div>
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2">
                        <input
                          type="checkbox"
                          checked={selectedProducts.length === products.length}
                          onChange={handleSelectAll}
                        />
                      </th>
                      <th className="py-2">Image</th>
                      <th className="py-2">Name</th>
                      <th className="py-2">Price</th>
                      <th className="py-2">Quantity</th>
                      <th className="py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products
                      .filter((product) =>
                        product.productName
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      )
                      .map((product) => (
                        <tr key={product._id} className="border-t">
                          <td className="py-2 text-center">
                            <input
                              type="checkbox"
                              checked={selectedProducts.includes(product._id)}
                              onChange={() => handleSelectProduct(product._id)}
                            />
                          </td>
                          <td className="py-2 text-center">
                            <img
                              src={product.productImage1}
                              alt={product.productName}
                              className="h-16"
                            />
                          </td>
                          <td className="py-2 text-center">
                            {product.productName}
                          </td>
                          <td className="py-2 text-center">{product.price}</td>
                          <td className="py-2 text-center">
                            {product.quantity}
                          </td>
                          <td className="py-2 text-center">
                            <button
                              className="text-green-700"
                            >
                            <Link href={`/product/${product._id}`}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="size-6"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                />
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                              </svg>
                            </Link>
                            </button>
                            <button className="text-blue-500 ml-2">
                              <Link
                                href={`/admin/products/table/update/${product._id}`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="size-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                  />
                                </svg>
                              </Link>
                            </button>
                            <button
                              onClick={() => handleDelete(product._id)}
                              className="text-red-500 ml-2"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="size-6"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div className="flex justify-between items-center py-4">
                  <button
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                    }
                    className="p-2 bg-gray-300 rounded"
                  >
                    Previous
                  </button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((prevPage) =>
                        Math.min(prevPage + 1, totalPages)
                      )
                    }
                    className="p-2 bg-gray-300 rounded"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductTable;
