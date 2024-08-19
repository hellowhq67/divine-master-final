"use client";
import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import Link from "next/link";
import { useDispatch } from "react-redux";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { add } from "@/redux/Cartslice";
export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [accessoryFilters, setAccessoryFilters] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const dispatch = useDispatch();
  const itemsPerPage = 10;

  const [isOpen, setIsOpen] = useState(false);
   const handelSidebar=()=>{
        alert('99')
   }
  
  const handlePagination = (event, pageNum) => {
    setPage(pageNum);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [totalProductsResponse, productsResponse] = await Promise.all([
          axios.get("/api/admin/products/all"),
          axios.get(
            `/api/admin/products?page=${page}&limit=${itemsPerPage}`
          ),
        ]);

        const totalProducts = totalProductsResponse.data.products.length;
        setProducts(productsResponse.data.products);
        const totalPagesCount = Math.ceil(totalProducts / 10); // Assuming 6 items per page
        setTotalPages(totalPagesCount);
        setLoading(true);

        setFilteredProducts(productsResponse.data.products);
        setTotalPages(data.totalPages); // Correctly using totalPages from API response
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [page]);

  useEffect(() => {
    filterProducts();
  }, [categoryFilters, accessoryFilters, minPrice, maxPrice]);

  const filterProducts = () => {
    let filtered = [...products];

    if (categoryFilters.length > 0) {
      filtered = filtered.filter((product) =>
        categoryFilters.includes(product.category)
      );
    }

    if (accessoryFilters.length > 0) {
      filtered = filtered.filter((product) =>
        accessoryFilters.includes(product.subcategory)
      );
    }

    if (minPrice) {
      filtered = filtered.filter((product) => product.price >= minPrice);
    }

    if (maxPrice) {
      filtered = filtered.filter((product) => product.price <= maxPrice);
    }

    setFilteredProducts(filtered);
  };

  const handleAdd = (product) => {
    dispatch(add(product));
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCategoryFilters((prevFilters) => [...prevFilters, value]);
    } else {
      setCategoryFilters((prevFilters) =>
        prevFilters.filter((filter) => filter !== value)
      );
    }
  };

  const handleAccessoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setAccessoryFilters((prevFilters) => [...prevFilters, value]);
    } else {
      setAccessoryFilters((prevFilters) =>
        prevFilters.filter((filter) => filter !== value)
      );
    }
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  return (
    <div className="my-10">
      <button className={styles.toggle} 
      
       onClick={handelSidebar}
      >
    
        filter
      </button>

      <div className={styles.wrapper}>
        <aside className={`${styles.aside} ${isOpen ? styles.open : ""}`}>
          <ul>
            <li>
              <h2 className="font-bold text-2xl">Categories</h2>
            </li>
            {["tops", "bottoms", "activewear", "footwear", "accessories"].map(
              (category) => (
                <li key={category}>
                  <label>
                    <input
                      type="checkbox"
                      name="category"
                      value={category}
                      onChange={handleCategoryChange}
                    />
                    {category}
                  </label>
                </li>
              )
            )}
          </ul>
          <ul>
            <li>
              <h2 className="font-bold text-2xl">Tops</h2>
            </li>
            {[
              "t-shirts",
              "shirts",
              "polo",
              "swearters",
              "jackets",
              "panjabi",
              "",
            ].map((accessory) => (
              <li key={accessory}>
                <label>
                  <input
                    type="checkbox"
                    name="accessory"
                    value={accessory}
                    onChange={handleAccessoryChange}
                  />
                  {accessory}
                </label>
              </li>
            ))}
          </ul>
          <ul>
            <li>
              <h2 className="font-bold text-2xl">Bottoms</h2>
            </li>
            {["pants", "shorts", "jeans"].map((accessory) => (
              <li key={accessory}>
                <label>
                  <input
                    type="checkbox"
                    name="accessory"
                    value={accessory}
                    onChange={handleAccessoryChange}
                  />
                  {accessory}
                </label>
              </li>
            ))}
          </ul>
          <div>
            <input
              type="text"
              placeholder="min price"
              value={minPrice}
              onChange={handleMinPriceChange}
            />
            <input
              type="text"
              placeholder="max price"
              value={maxPrice}
              onChange={handleMaxPriceChange}
            />
          </div>
        </aside>
        <div className={styles.wrapper2}>
          <div className="flex justify-between ">
            <nav class="flex  mx-10" aria-label="Breadcrumb">
              <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li class="inline-flex items-center">
                  <Link
                    href="/"
                    class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                  >
                    <svg
                      class="w-3 h-3 me-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    Home
                  </Link>
                </li>
                <li>
                  <div class="flex items-center">
                    <svg
                      class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <Link
                      href="/products"
                      class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                    >
                      Products
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div class="flex items-center">
                    <svg
                      class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                      All{" "}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <select name="" id="">
              <option value="New product"> Short by </option>

              <option value="New product"> Tready Items</option>
              <option value=" Min price"> Min price</option>
              <option value="Max price"> Max price</option>
            </select>
          </div>

          <div className={styles.productWrapper}>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                {filteredProducts.map((product) => {
                  return (
                    <div class="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                      <a href="#">
                        <img
                          class="h-80 w-72 object-cover rounded-t-xl"
                          src={product.productImage1}
                          alt="image"
                        />

                        <div class="px-4 py-3 w-72">
                          <span class="text-gray-400 mr-3 uppercase text-xs">
                            DIVINE
                          </span>
                          <p class="text-lg font-bold text-black truncate block capitalize">
                            {product.productName.slice(0, 21)}...
                          </p>
                          <div class="flex items-center">
                            {!product.smartPrice ? (
                              <p class="text-lg font-semibold text-black cursor-auto my-3">
                                {product.price} BTD
                              </p>
                            ) : (
                              <>
                                <p class="text-lg font-semibold text-black cursor-auto my-3">
                                  {product.smartPrice}BTD
                                </p>
                                <del>
                                  <p class="text-sm text-gray-600 cursor-auto ml-2">
                                    {product.price} BTD
                                  </p>
                                </del>
                              </>
                            )}

                            <button
                              onClick={() => handleAdd(product)}
                              class="ml-auto"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                class="bi bi-bag-plus"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                                />
                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </a>
                    </div>
                  );
                })}
              </>
            )}
          </div>
          <div className="flex items-center w-full  justify-center">
            <Pagination
              style={{ margin: "20px" }}
              count={totalPages}
              shape="rounded"
              page={page}
              onChange={handlePagination}
            ></Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}
