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
import Loder from "@/components/loder/Loder";
import axios from "axios";
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
  const [totalItem, setTotalItem] = useState(0);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [page, setPage] = useState(1);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [dropdownStates, setDropdownStates] = useState({});
  const [totalPages, setTotalPages] = useState(1);
  const [orders, setOrder] = useState([]);
  const totalRevinew = 0;
  const toggleDropdown = (id) => {
    setDropdownStates((prevStates) => ({
      ...prevStates,
      [id]: !prevStates[id],
    }));
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".dropdown-button")) {
      setDropdownStates({});
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const itemsPerPage = 10;

  const handlePagination = (event, pageNum) => {
    setPage(pageNum);
  };
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [totalProductsResponse, productsResponse, orderResponse] =
          await Promise.all([
            axios.get("/api/admin/products/all"),
            axios.get(`/api/admin/products?page=${page}&limit=${itemsPerPage}`),
            axios.get(`/api/user/orders`),
          ]);

        const totalProducts = totalProductsResponse.data.products.length;
        setTotalItem(totalProducts);
        setProducts(productsResponse.data.products);
        setOrder(orderResponse.data.orders);
        console.log(orderResponse.data.orders);
        const totalPagesCount = Math.ceil(totalProducts / 10);
        setTotalPages(totalPagesCount);
      } catch (error) {
        toast(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [page]);

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

  const handleDelete = async (id) => {
    console.log("Delete product with ID:", id);

    try {
      const response = await fetch(
        `/api/admin/delete-products/${id}`,
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

  const totalSales = orders.reduce(
    (accumulator, order) => accumulator + order.total_amount,
    0
  );

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItem);
  return (
    <>
      <Sidebar />
      <ToastContainer />
      <div>
        <Navigation />

        <div class="p-4 sm:ml-64 my-10">
          <section class="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
            <div class="px-4 mx-auto max-w-screen-2xl lg:px-12">
              <div class="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                <div class="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
                  <div class="flex items-center flex-1 space-x-4">
                    <h5>
                      <span class="text-gray-500">{`All Products:`}</span>
                      <span class="dark:text-white">{totalItem}</span>
                    </h5>
                    <h5>
                      <span class="text-gray-500">{`Total sales:`}</span>
                      <span class="dark:text-white">{totalSales} TK</span>
                    </h5>
                  </div>
                  <div class="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                    <button
                      type="button"
                      class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                    >
                      <svg
                        class="h-3.5 w-3.5 mr-2"
                        fill="currentColor"
                        viewbox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        />
                      </svg>
                      Add new product
                    </button>
                    <div
                      type="button"
                      class="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
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
                          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                      </svg>

                      <input
                        placeholder="search itmes"
                        type="text"
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Link
                      href={"/admin/forms"}
                      type="button"
                      class="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
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
                          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      Add New
                    </Link>
                  </div>
                </div>
                <div class="overflow-x-auto">
                  {loading ? (
                    <Loder />
                  ) : products.length === 0 ? (
                    <div className="text-center text-gray-500">
                      No items found. Please add items from the CRUD page.
                    </div>
                  ) : (
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            <input
                              type="checkbox"
                              onChange={handleSelectAll}
                              checked={
                                selectedProducts.length === products.length
                              }
                            />
                            <label for="checkbox-all" class="sr-only">
                              checkbox
                            </label>
                          </th>

                          <th scope="col" class="px-4 py-3">
                            Product
                          </th>
                          <th scope="col" class="px-4 py-3">
                            Category
                          </th>
                          <th scope="col" class="px-4 py-3">
                            Stock
                          </th>
                          <th scope="col" class="px-4 py-3">
                            Price
                          </th>
                          <th scope="col" class="px-4 py-3">
                            Smart Price
                          </th>
                          <th scope="col" class="px-4 py-3">
                            Rating
                          </th>
                          <th scope="col" class="px-4 py-3">
                            Sales
                          </th>
                          <th scope="col" class="px-4 py-3">
                            Sizes
                          </th>
                          <th scope="col" class="px-4 py-3">
                            Actions
                          </th>
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
                            <tr class="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                              <td class="w-4 px-4 py-3">
                                <div class="flex items-center">
                                  <input
                                    id="checkbox-table-search-1"
                                    type="checkbox"
                                    checked={selectedProducts.includes(
                                      product._id
                                    )}
                                    onChange={() =>
                                      handleSelectProduct(product._id)
                                    }
                                    class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                  />

                                  <label
                                    for="checkbox-table-search-1"
                                    class="sr-only"
                                  >
                                    checkbox
                                  </label>
                                </div>
                              </td>
                              <th
                                scope="row"
                                class="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                <img
                                  src={product.productImage1}
                                  alt="iMac Front Image"
                                  class="w-auto h-8 mr-3"
                                />
                                {product.productName.slice(0, 16)}
                              </th>
                              <td class="px-4 py-2">
                                <span class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                                  {product.category}
                                </span>
                              </td>
                              <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <div class="flex items-center">
                                  <div class="inline-block w-4 h-4 mr-2 bg-red-700 rounded-full"></div>
                                  {product.stock}
                                </div>
                              </td>
                              <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {product.price} BTD
                              </td>
                              <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {product.smartPrice} BTD
                              </td>
                              <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <div class="flex items-center">
                                  <svg
                                    aria-hidden="true"
                                    class="w-5 h-5 text-yellow-400"
                                    fill="currentColor"
                                    viewbox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  <svg
                                    aria-hidden="true"
                                    class="w-5 h-5 text-yellow-400"
                                    fill="currentColor"
                                    viewbox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  <svg
                                    aria-hidden="true"
                                    class="w-5 h-5 text-yellow-400"
                                    fill="currentColor"
                                    viewbox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  <svg
                                    aria-hidden="true"
                                    class="w-5 h-5 text-yellow-400"
                                    fill="currentColor"
                                    viewbox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  <svg
                                    aria-hidden="true"
                                    class="w-5 h-5 text-yellow-400"
                                    fill="currentColor"
                                    viewbox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  <span class="ml-1 text-gray-500 dark:text-gray-400">
                                    {product.rating}
                                  </span>
                                </div>
                              </td>
                              <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <div class="flex items-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewbox="0 0 24 24"
                                    fill="currentColor"
                                    class="w-5 h-5 mr-2 text-gray-400"
                                    aria-hidden="true"
                                  >
                                    <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                                  </svg>
                                  {product.sells}
                                </div>
                              </td>
                              <td class="px-4 py-2">
                                {product.sizes[0].length}
                              </td>
                              <td className="px-4 py-3">
                                <div className="relative inline-block text-left">
                                  <button
                                    className="dropdown-button"
                                    type="button"
                                    onClick={() => toggleDropdown(product._id)}
                                  >
                                    Actions
                                  </button>
                                  {dropdownStates[product._id] && (
                                    <div
                                      className="absolute right-0 z-10 w-44 mt-2 origin-top-right bg-white border border-gray-300 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                                      role="menu"
                                      aria-orientation="vertical"
                                      aria-labelledby="menu-button"
                                      tabIndex="-1"
                                    >
                                      <div className="py-1" role="none">
                                        <Link
                                          href={`/admin/products/table/update/${product._id}`}
                                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                          role="menuitem"
                                        >
                                          Edit
                                        </Link>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleDelete(product._id)
                                          }
                                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                          role="menuitem"
                                        >
                                          Delete
                                        </button>
                                        <Link
                                          href={`/product/${product._id}`}
                                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                          role="menuitem"
                                        >
                                          View
                                        </Link>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  )}
                </div>
                <nav
                  className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
                  aria-label="Table navigation"
                >
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Showing{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {startItem}-{endItem}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {totalItem}
                    </span>
                  </span>
                  <ul className="inline-flex items-stretch -space-x-px">
                    <li>
                      <button
                        onClick={(event) =>
                          handlePagination(event, currentPage - 1)
                        }
                        disabled={currentPage === 1}
                        className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        <span className="sr-only">Previous</span>
                        <svg
                          className="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </li>
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <li key={index}>
                        <button
                          onClick={(event) =>
                            handlePagination(event, index + 1)
                          }
                          className={`flex items-center justify-center px-3 py-2 text-sm leading-tight ${
                            currentPage === index + 1
                              ? "border text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                              : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                          }`}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={(event) =>
                          handlePagination(event, currentPage + 1)
                        }
                        disabled={currentPage === totalPages}
                        className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        <span className="sr-only">Next</span>
                        <svg
                          className="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ProductTable;
