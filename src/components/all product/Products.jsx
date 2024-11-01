/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
"use client";

import { useState, useEffect } from "react";
import styles from "./style.module.css";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Loder from "@/components/loder/Loder";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { useDispatch } from "react-redux";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { add } from "@/redux/Cartslice";
const sortOptions = [
  { name: "Most Popular", value: "popular" },
  { name: "Best Rating", value: "rating" },
  { name: "Newest", value: "newest" },
  { name: "Price: Low to High", value: "priceLowToHigh" },
  { name: "Price: High to Low", value: "priceHighToLow" },
];

const subCategories = [
  { name: "Mens", href: "/" },
  { name: "Sneakers", href: "#" },
  { name: "Hoddie", href: "#" },
  { name: "T Shirt", href: "#" },
  { name: "Bottoms", href: "#" },
];
const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "new-arrivals", label: "New Arrivals", checked: false },
      { value: "sale", label: "Sale", checked: false },
      { value: "travel", label: "Travel", checked: true },
      { value: "organization", label: "Organization", checked: false },
      { value: "accessories", label: "Accessories", checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "2l", label: "2L", checked: false },
      { value: "6l", label: "6L", checked: false },
      { value: "12l", label: "12L", checked: false },
      { value: "18l", label: "18L", checked: false },
      { value: "20l", label: "20L", checked: false },
      { value: "40l", label: "40L", checked: true },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Products() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [accessoryFilters, setAccessoryFilters] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOption, setSortOption] = useState(sortOptions[0].value);
  const dispatch = useDispatch();
  const itemsPerPage = 9;

  const [isOpen, setIsOpen] = useState(false);
  const handelSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handlePagination = (event, pageNum) => {
    setPage(pageNum);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [totalProductsResponse, productsResponse] = await Promise.all([
          axios.get("/api/admin/products/all"),
          axios.get(`/api/admin/products?page=${page}&limit=${itemsPerPage}`),
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
  }, [categoryFilters, accessoryFilters, minPrice, maxPrice, searchQuery]);
  useEffect(() => {
    filterAndSortProducts();
  }, [sortOption]);
  const filterProducts = () => {
    let filtered = [...products];
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

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
      filtered = filtered.filter((product) =>
        !product.smartPrice ? product.price : product.smartPrice >= minPrice
      );
    }

    if (maxPrice) {
      filtered = filtered.filter((product) =>
        !product.smartPrice ? product.price : product.smartPrice <= maxPrice
      );
    }

    setFilteredProducts(filtered);
  };
  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Apply sorting
    switch (sortOption) {
      case "popular":
        filtered.sort((a, b) => b.popularity - a.popularity);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "priceLowToHigh":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "priceHighToLow":
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  };
  const handleSortChange = (option) => {
    setSortOption(option.value);
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
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href} className="block px-2 py-3">
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>

                <Disclosure
                  as="div"
                  className="border-t border-gray-200 px-4 py-6"
                >
                  <h3 className="-mx-2 -my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">
                        Cetagory
                      </span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon
                          aria-hidden="true"
                          className="h-5 w-5 group-data-[open]:hidden"
                        />
                        <MinusIcon
                          aria-hidden="true"
                          className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-6">
                      {[
                        "tops",
                        "bottoms",
                        "activewear",
                        "footwear",
                        "accessories",
                      ].map((category) => (
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
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
                <Disclosure
                  as="div"
                  className="border-t border-gray-200 px-4 py-6"
                >
                  <h3 className="-mx-2 -my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">
                        Sub Cetagory
                      </span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon
                          aria-hidden="true"
                          className="h-5 w-5 group-data-[open]:hidden"
                        />
                        <MinusIcon
                          aria-hidden="true"
                          className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-6">
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
                    </div>
                  </DisclosurePanel>
                </Disclosure>
                <Disclosure
                  as="div"
                  className="border-t border-gray-200 px-4 py-6"
                >
                  <h3 className="-mx-2 -my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">
                        Price Range
                      </span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon
                          aria-hidden="true"
                          className="h-5 w-5 group-data-[open]:hidden"
                        />
                        <MinusIcon
                          aria-hidden="true"
                          className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-6">
                      <input
                        type="text"
                        className="border-black"
                        placeholder="min price"
                        value={minPrice}
                        onChange={handleMinPriceChange}
                      />
                      <input
                        type="text"
                        className="border-black"
                        placeholder="max price"
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                      />
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-2xl  sm:text-4xl lg:text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem
                        key={option.value}
                        onClick={() => handleSortChange(option)}
                      >
                        <a
                          href="#"
                          className={`block px-4 py-2 text-sm ${
                            sortOption === option.value
                              ? "font-medium text-gray-900"
                              : "text-gray-500"
                          }`}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-6">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                >
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))}
                </ul>
                <Disclosure as="div" className="border-b border-gray-200 py-6">
                  <h3 className="-my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">
                        Cetagory
                      </span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon
                          aria-hidden="true"
                          className="h-5 w-5 group-data-[open]:hidden"
                        />
                        <MinusIcon
                          aria-hidden="true"
                          className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-4">
                      {[
                        "tops",
                        "bottoms",
                        "activewear",
                        "footwear",
                        "accessories",
                      ].map((category) => (
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
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
                <Disclosure as="div" className="border-b border-gray-200 py-6">
                  <h3 className="-my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">
                        Sub Cetagory
                      </span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon
                          aria-hidden="true"
                          className="h-5 w-5 group-data-[open]:hidden"
                        />
                        <MinusIcon
                          aria-hidden="true"
                          className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-4">
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
                    </div>
                  </DisclosurePanel>
                </Disclosure>
                <Disclosure as="div" className="border-b border-gray-200 py-6">
                  <h3 className="-my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">Min-Max</span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon
                          aria-hidden="true"
                          className="h-5 w-5 group-data-[open]:hidden"
                        />
                        <MinusIcon
                          aria-hidden="true"
                          className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-4">
                      <input
                        type="text"
                        className="border-black"
                        placeholder="min price"
                        value={minPrice}
                        onChange={handleMinPriceChange}
                      />
                      <input
                        type="text"
                        className="border-black"
                        placeholder="max price"
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                      />
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              </form>
              <div className="flex flex-col">
                <div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full lg:w-[400px] p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search Items"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    required
                  />
                </div>
                {/* Product grid */}
                <div className="lg:col-span-3 ">
                  <div className={styles.productWrapper}>
                    {loading ? (
                      <Loder />
                    ) : (
                      <>
                        {filteredProducts.map((product) => {
                          return (
                            <div className={styles.Card}>
                              <Link
                                href={`/product/${product._id}`}
                                className={styles.productImgae}
                              >
                                <img
                                  src={product.productImage1}
                                  alt={product.productName}
                                />
                                <span
                                  className={styles.discount}
                                >{`${Math.round(
                                  ((product.price - product.smartPrice) /
                                    product.price) *
                                    100
                                )}% off`}</span>
                              </Link>
                              <div className={styles.ProductInfo}>
                                <Link href={`/product/${product._id}`} className={styles.productTitle}>
                                  {`${product.productName.slice(0, 20)} ....`}
                                </Link>
                                <div className="flex items-start justify-start">
                                  {!product.smartPrice ? (
                                    <span>{product.price}</span>
                                  ) : (
                                    <span className=" flex items-center text-sm">
                                      <span className="font-sans text-sm px-1 text-black">
                                        BTD
                                      </span>
                                      {product.smartPrice}
                                      <span className="mx-1 text-sm line-through text-gray-600">
                                        {product.price}
                                      </span>
                                    </span>
                                  )}
                                </div>
                              </div>
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
          </section>
        </main>
      </div>
    </div>
  );
}
