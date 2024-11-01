"use client";
import React, { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { Switch } from "@headlessui/react";
import { UploadDropzone } from "@uploadthing/react";
import { ToastContainer, toast } from "react-toastify";
import Navigation from "@/components/admin/navigation/Navigation";
import { useRouter } from "next/navigation";
const categories = {
  mens: {
    winter:[
    "hoddie",
    "dropshoulder",
    "sweaters",
    "jackets",
    "sneakers"
    ],
    tops: [
      "t-shirts",
      "sweaters",
      "dropshoulder",
      "jackets",
      "long-selve shirts",
      "shirts",
      "panjabi",
      "polo",
    ],
    bottoms: ["pants", "shorts", "jeans", "payjama"],
    activewear: [
      "yoga pants",
      "gym shorts",
      "sports bras",
      "track pants",
      "hoodies",
    ],
    footwear: ["sneakers", "boots", "sandals", "loafers", "flats"],
    accessories: [
      "watches",
      "wallets",
      "bags",
      "sunglasses",
      "hats",
      "belts",
      "scarves",
      "gloves",
    ],
  },
  womens: {
    tops: ["blouses", "crop tops", "sweaters", "jackets", "tank tops"],
    bottoms: ["skirts", "shorts", "jeans", "leggings", "trousers"],
    activewear: [
      "yoga pants",
      "gym shorts",
      "sports bras",
      "track pants",
      "hoodies",
    ],
    footwear: ["heels", "boots", "sandals", "flats", "sneakers"],
    accessories: [
      "watches",
      "handbags",
      "scarves",
      "sunglasses",
      "hats",
      "belts",
      "gloves",
    ],
  },
};

export default function Form() {
  const router = useRouter()
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
  const [productCost, setProductCost] = useState(0);
  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
    setCategory("");
    setSubCategory(""); // Reset category and subcategory when department changes
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubCategory(""); // Reset subcategory when category changes
  };

  const handleSubCategoryChange = (e) => {
    setSubCategory(e.target.value);
  };
  const handleSizeChange = (event) => {
    const { value, checked } = event.target;
    setSelectedSizes((prevSelectedSizes) => {
      if (checked) {
        return [...prevSelectedSizes, value];
      } else {
        return prevSelectedSizes.filter((size) => size !== value);
      }
    });
  };
  const handelSubmit = async () => {
    const pendingToastId = toast.loading("Uploading product...");
    try {
      const response = await fetch("/api/admin/add-products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shippings: shipping,
          glodalshippings: shippingGlobal,
          productImage1: imageUrl,
          productImage2: imageUrl2,
          productImage3: imageUrl3,
          productImage4: imageUrl4,
          productImage5: imageUrl5,
          productName: productName,
          sizes: [selectedSizes],
          color: color,
          price: price,
          smartPrice: smartprice,
          priceUsd: priceUSD,
          date: date,
          description: desc,
          department: department,
          category: category,
          subcetagory: subCategory,
          isFeatured: enabled,
          freeShipping: enabled1,
          cupon: cupon,
          usaShipping: shippingUSA,
          europShipping: shippingERU,
          quantity: 0,
          stock: quantity,
          sku: sku,
          rating: 0,
          costing: productCost,
          sells: 0,
        }),
      });
      const responseData = await response.json();
      toast.update(pendingToastId, {
        render: "Product published successfully!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      router.push("/admin/forms");
    } catch (error) {
      toast.update(pendingToastId, {
        render: "An error occurred while creating the product.",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  
  
  };

  return (
    <div>
      <ToastContainer />
      <Navigation />
      <Sidebar />
      <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div class="flex items-center justify-center h-100 mb-4 rounded bg-gray-50 dark:bg-gray-800"></div>
          <section class="bg-white dark:bg-gray-900">
            <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
              <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Add a new product
              </h2>
              <div>
                <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div class="sm:col-span-2">
                    <label
                      for="name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type product name"
                      required=""
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </div>
                  <div class="w-full">
                    <label
                      for="brand"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Color
                    </label>
                    <input
                      type="text"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="color"
                      required=""
                      onChange={(e) => setColor(e.target.value)}
                    />
                  </div>
                  <div class="w-full">
                    <label
                      for="price"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Price In BTD
                    </label>
                    <input
                      type="number"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="2999 TK "
                      required=""
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div class="w-full">
                    <label
                      for="price"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Smart price
                    </label>
                    <input
                      type="number"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="off price"
                      required=""
                      onChange={(e) => setsmartPrice(e.target.value)}
                    />
                  </div>
                  <div class="w-full">
                    <label
                      for="sku"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      SKU
                    </label>
                    <input
                      type="text"
                      name="sku"
                      id="sku"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Product SKU"
                      required=""
                      onChange={(e) => setSku(e.target.value)}
                    />
                  </div>

                  <div class="w-full">
                    <label
                      for="shipping"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      SHIPPINS AT MANIKGANJ
                    </label>
                    <input
                      type="number"
                      name="shippings"
                      id="shippings"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="shippings"
                      required=""
                      onChange={(e) => setShipping(e.target.value)}
                    />
                  </div>
                  <div class="w-full">
                    <label
                      for="price"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      GLOBAL SHIPPING
                    </label>
                    <input
                      type="number"
                      name="smart price"
                      id=" smart price"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="out side dhaka"
                      required=""
                      onChange={(e) => setShippingGlobal(e.target.value)}
                    />
                  </div>
                  <div class="w-full">
                    <label
                      for="brand"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Date Time
                    </label>
                    <input
                      type="datetime-local"
                      name="shippings"
                      id="shippings"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      onChange={(e) => SetDate(e.target.value)}
                    />
                  </div>
                  <div class="w-full">
                    <label
                      for="price"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Shipping Cost EURO
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="299 USD "
                      required=""
                      onChange={(e) => setShippingERU(e.target.value)}
                    />
                  </div>
                  <div class="w-full">
                    <label
                      for="price"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Shipping Cost USA
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder=" USD "
                      required=""
                      onChange={(e) => setShippingUSA(e.target.value)}
                    />
                  </div>
                  <div class="w-full">
                    <label
                      for="Cupon"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >{`Add Cupon(optional)`}</label>

                    <input
                      type="text"
                      name="smart price"
                      id=" smart price"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Add Cupon"
                      onChange={(e) => setCupon(e.target.value)}
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="department"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Department
                    </label>
                    <select
                      id="department"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      onChange={handleDepartmentChange}
                    >
                      <option value="">Select department</option>
                      <option value="mens">Mens</option>
                      <option value="womens">Womens</option>
                    </select>
                  </div>

                  <div className="w-full ">
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      onChange={handleCategoryChange}
                      value={category}
                      disabled={!department} // Disable if no department selected
                    >
                      <option value="">Select category</option>
                      {department &&
                        Object.keys(categories[department]).map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full ">
                    <label
                      htmlFor="subcategory"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Subcategory
                    </label>
                    <select
                      id="subcategory"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      onChange={handleSubCategoryChange}
                      value={subCategory}
                      disabled={!category} // Disable if no category selected
                    >
                      <option value="">Select subcategory</option>
                      {category &&
                        categories[department][category].map((subCat) => (
                          <option key={subCat} value={subCat}>
                            {subCat}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full">
                    <label
                      for="item-weight"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Total Quantity
                    </label>
                    <input
                      type="number"
                      name="totalQuantity"
                      id="totalQuantity"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="12"
                      required=""
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>

                  <div>
                    <h2>Is Featured</h2>
                    <Switch
                      checked={enabled}
                      onChange={setEnabled}
                      className={`${
                        enabled ? "bg-blue-600" : "bg-gray-200"
                      } relative inline-flex h-6 w-11 items-center rounded-full`}
                    >
                      <span className="sr-only">Is Featured</span>
                      <span
                        className={`${
                          enabled ? "translate-x-6" : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                      />
                    </Switch>
                  </div>
                  <div>
                    <h2>{`Free Shippings?`}</h2>
                    <Switch
                      checked={enabled1}
                      onChange={setEnabled1}
                      className={`${
                        enabled1 ? "bg-black" : "bg-gray-200"
                      } relative inline-flex h-6 w-11 items-center rounded-full`}
                    >
                      <span className="sr-only">Is Featured</span>
                      <span
                        className={`${
                          enabled1 ? "translate-x-6" : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                      />
                    </Switch>
                  </div>

                  <div className="w-full">
                    <div className="">
                      <div className="space-x-4">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            value="M"
                            checked={selectedSizes.includes("M")}
                            onChange={handleSizeChange}
                            className="form-checkbox h-5 w-5 text-blue-600"
                          />
                          <span className="ml-2 text-lg">M</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            value="L"
                            checked={selectedSizes.includes("L")}
                            onChange={handleSizeChange}
                            className="form-checkbox h-5 w-5 text-blue-600"
                          />
                          <span className="ml-2 text-lg">L</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            value="XL"
                            checked={selectedSizes.includes("XL")}
                            onChange={handleSizeChange}
                            className="form-checkbox h-5 w-5 text-blue-600"
                          />
                          <span className="ml-2 text-lg">XL</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            value="XXL"
                            checked={selectedSizes.includes("XXL")}
                            onChange={handleSizeChange}
                            className="form-checkbox h-5 w-5 text-blue-600"
                          />
                          <span className="ml-2 text-lg">XXL</span>
                        </label>
                      </div>
                      <p className="mt-4 text-xl">
                        Selected sizes: {selectedSizes.join(", ")}
                      </p>
                    </div>
                  </div>
                  <div class="w-full">
                    <label
                      for="price"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Price In USD
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="299 USD "
                      required=""
                      onChange={(e) => setPriceUSD(e.target.value)}
                    />
                  </div>
                  <div class="w-full">
                    <label
                      for="price"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Product Cost
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Add product Cost "
                      required=""
                      onChange={(e) => setProductCost(e.target.value)}
                    />
                  </div>
                  <div class="sm:col-span-2">
                    <label
                      for="description"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows="8"
                      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Your description here"
                      onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="w-full">
                    {!imageUrl && (
                      <UploadDropzone
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          // Do something with the response
                          const fileUrl = res?.[0]?.url;
                          setImageUrl(fileUrl);
                          console.log("Files: ", res);
                        }}
                        onUploadError={(error) => {
                          console.log(error);
                        }}
                      />
                    )}

                    {/* Render the uploaded image if imageUrl2 is available */}
                    {imageUrl && (
                      <div>
                        <img
                          width={220}
                          src={imageUrl}
                          className=""
                          alt="Uploaded Image"
                        />
                        {/* Button to remove the uploaded image and show UploadDropzone again */}
                        <button onClick={() => setImageUrl(null)}>
                          Remove Image
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="w-full">
                    {!imageUrl2 && (
                      <UploadDropzone
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          // Do something with the response
                          const fileUrl = res?.[0]?.url;
                          setImageUrl2(fileUrl);
                          console.log("Files: ", res);
                        }}
                        onUploadError={(error) => {
                          console.log(error);
                        }}
                      />
                    )}

                    {/* Render the uploaded image if imageUrl2 is available */}
                    {imageUrl2 && (
                      <div>
                        <img
                          width={220}
                          src={imageUrl2}
                          className=""
                          alt="Uploaded Image"
                        />
                        {/* Button to remove the uploaded image and show UploadDropzone again */}
                        <button onClick={() => setImageUrl2(null)}>
                          Remove Image
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="w-full">
                    {!imageUrl3 && (
                      <UploadDropzone
                        endpoint="imageUploader3"
                        onClientUploadComplete={(res) => {
                          // Do something with the response
                          const fileUrl = res?.[0]?.url;
                          setImageUrl3(fileUrl);
                          console.log("Files: ", res);
                        }}
                        onUploadError={(error) => {
                          console.log(error);
                        }}
                      />
                    )}

                    {/* Render the uploaded image if imageUrl2 is available */}
                    {imageUrl3 && (
                      <div>
                        <img
                          width={220}
                          src={imageUrl3}
                          className=""
                          alt="Uploaded Image"
                        />
                        {/* Button to remove the uploaded image and show UploadDropzone again */}
                        <button onClick={() => setImageUrl3(null)}>
                          Remove Image
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="w-full">
                    {!imageUrl4 && (
                      <UploadDropzone
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          // Do something with the response
                          const fileUrl = res?.[0]?.url;
                          setImageUrl4(fileUrl);
                          console.log("Files: ", res);
                        }}
                        onUploadError={(error) => {
                          console.log(error);
                        }}
                      />
                    )}

                    {/* Render the uploaded image if imageUrl2 is available */}
                    {imageUrl4 && (
                      <div>
                        <img
                          width={220}
                          src={imageUrl4}
                          className=""
                          alt="Uploaded Image"
                        />
                        {/* Button to remove the uploaded image and show UploadDropzone again */}
                        <button onClick={() => setImageUrl4(null)}>
                          Remove Image
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="w-full">
                    {!imageUrl5 && (
                      <UploadDropzone
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          // Do something with the response
                          const fileUrl = res?.[0]?.url;
                          setImageUrl5(fileUrl);
                          console.log("Files: ", res);
                        }}
                        onUploadError={(error) => {
                          console.log(error);
                        }}
                      />
                    )}

                    {/* Render the uploaded image if imageUrl2 is available */}
                    {imageUrl5 && (
                      <div>
                        <img
                          width={220}
                          src={imageUrl5}
                          className=""
                          alt="Uploaded Image"
                        />
                        {/* Button to remove the uploaded image and show UploadDropzone again */}
                        <button onClick={() => setImageUrl5(null)}>
                          Remove Image
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={handelSubmit}
                  class="bg-black text-white px-10 py-2 my-4  "
                >
                  UPLOAD{" "}
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
