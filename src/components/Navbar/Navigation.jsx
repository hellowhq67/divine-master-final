"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./style.module.css"; // Ensure correct path
import Link from "next/link";
import Header from "./Header";
import { UseAuth } from "@/app/context/AuthContext";
import { useSelector } from "react-redux";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Cart from "../cart/Cart";

// Utility function for debouncing
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export default function Navigation() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenu,setMobileMenu] =useState(false)
  const [menu1, setMenu1] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { user, logOut } = UseAuth();
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // For error handling
  const userID = user ? user.uid : null;
  const item = useSelector((state) => state.cart.items);

  // Remove dummyData
  // const dummyData = [ ... ];

  const openMenu = () => setMenu1(true);
  const closeMenu = () => setMenu1(false);
  const openMobileMenu = () =>setMobileMenu(true)
  const closeMobileMenu=()=>setMobileMenu(false)
  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);
  const handleMouseEnter = (menu) => {
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  const handleLogout = async () => {
    try {
      // Delete user from MongoDB
      if (userID) {
        const response = await fetch(`/api/user/all-users/${userID}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uid: userID }),
        });
        if (response.ok) {
          alert("User deleted");
        }

        if (!response.ok) {
          throw new Error("Failed to delete user");
        }

        const responseData = await response.json();
        console.log("Delete API Response:", responseData);
      }

      // Log out user from Firebase
      await logOut();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle clicks outside the search dropdown to close it
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleShowSearch = () => {
    setShowSearch(true);
  };

  // Function to fetch search results from the API
  const fetchSearchResults = async (query) => {
    if (!query) {
      setSearchResults([]);
      setShowSearch(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/products?productName=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      const data = await response.json();
      if (data.success) {
        setSearchResults(data.products);
        setShowSearch(true);
      } else {
        setSearchResults([]);
        setShowSearch(false);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch search results");
      setSearchResults([]);
      setShowSearch(false);
    } finally {
      setLoading(false);
    }
  };

  // Debounced version of fetchSearchResults
  const debouncedFetchSearchResults = useCallback(debounce(fetchSearchResults, 300), []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedFetchSearchResults(value);
  };

  return (
    <div className="w-full">
      <Header />

      <nav className={`${styles.nav} ${isFixed ? styles.fixedNav : ""}`}>
        <Link className={styles.Logo} href="/">
          DIVINE
        </Link>
        <ul className={styles.NavigationLink}>
          {/* MENS Link with Mega Menu */}
          <li
            onMouseEnter={() => handleMouseEnter("MENS")}
            onMouseLeave={handleMouseLeave}
            className={styles.menuItem}
          >
            <Link href="/mens" className={styles.navLink}>
              MENS
            </Link>
            {activeMenu === "MENS" && (
              <div className={styles.megaMenu}>
                {/* Mega Menu Content */}
                <div className={styles.megaContainer}>
                  <div className={styles.megaColumn}>
                    <h3>Categories</h3>
                    <Link href="/category/tops">Tops</Link>
                    <Link href="/category/bottoms">Bottoms</Link>
                    <Link href="/category/accessories">Accessories</Link>
                    <Link href="/category/footwear">Footwear</Link>

                  </div>
                  <div className={styles.megaColumn}>
                    <h3>Sub Cetagory</h3>
                    <Link href="/category/tops">T shirts</Link>

                    <Link href="/category/winter">Hoddie</Link>
                    <Link href="/category/bottoms">Joggers</Link>
                    <Link href="/category/tops">Drop shoulder</Link>
                  </div>
                  <div className={styles.megaColumn}>
                    <h3>New Arrivals</h3>
                    <Link href="/products">New In</Link>
                    <Link href="/products">Sale Items</Link>
                    <Link href="/products">Popular</Link>
                  </div>
              
                </div>
              </div>
            )}
          </li>
 {/* WINTER Link with Mega Menu */}
 <li
            onMouseEnter={() => handleMouseEnter("WINTER")}
            onMouseLeave={handleMouseLeave}
            className={styles.menuItem}
          >
            <Link href="/winter" className={styles.navLink}>
              WINTER
            </Link>
            {activeMenu === "WINTER" && (
              <div className={styles.megaMenu}>
                {/* Mega Menu Content */}
                <div className={styles.megaContainer}>
                  <div className={styles.megaColumn}>
                    <h3>Winter Collection</h3>
                    <Link href="/category/winter">Coats</Link>
                    <Link href="/category/winter">Sweaters</Link>
                    <Link href="/category/accessories">Accessories</Link>
                  </div>
                  <div className={styles.megaColumn}>
                    <h3>Winter Essentials</h3>
                    <Link href="/category/winter">Hoodies</Link>
                    <Link href="/category/winter">Sneakers</Link>
                    <Link href="/category/winter">Hats</Link>
                  </div>
        category
                </div>
              </div>
            )}
          </li>
          {/* ALL Link with Mega Menu */}
          <li
       
            className={styles.menuItem}
          >
            <Link href="/products" className={styles.navLink}>
              ALL
            </Link>
           
          </li>

         

          <li className="px-2">
            <Link href="/tops" className="font-medium text-gray-700">
              TOPS
            </Link>
          </li>
          <li>
            <Link href="/bottoms" className="font-medium text-gray-700">
              BOTTOMS
            </Link>
          </li>
          <li>
            <Link href="/sale" className={`text-red-600 px-2`}>
              SALE
            </Link>
          </li>
        </ul>
        <div className={styles.Info}>
          {/* Search Input and Results */}
          <div className={styles.searchContainer} ref={searchRef}>
        <input
          type="text"
          placeholder="Search"
          className={styles.searchInput}
          value={searchInput}
          onChange={handleSearchChange}
          onFocus={handleShowSearch}
        />
        <MagnifyingGlassIcon style={{width:"20px"}} className={styles.searchIcon} />

        {showSearch && (
          <div className={`${styles.searchResult} ${showSearch ? styles.openSearch : ""}`}>
            {loading ? (
              <div className={styles.loading}>Loading...</div>
            ) : error ? (
              <div className={styles.error}>{error}</div>
            ) : searchResults.length > 0 ? (
              <ul className={styles.suggestionsList}>
                {searchResults.map((result) => (
                  <li key={result._id} className={styles.suggestionItem}>
                    <Link href={`/product/${result._id}`} passHref>
                      {result.productName}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className={styles.noResults}>No results found</div>
            )}
          </div>
        )}
      </div>

          {/* Account and Cart Links */}
          <div className="px-2 flex items-center justify-center">
            {!user ? (
              <div className="flex space-x-4">
                <Link href="/registration" className={styles.navLink}>
                  Create Account
                </Link>
                <Link href="/login" className={styles.navLink}>
                  Login
                </Link>
              </div>
            ) : (
              <div className="relative group">
                <div className={styles.profile}>
                  {user ? user.displayName : null}
                </div>
                {/* Dropdown Menu */}
                <div className="absolute hidden group-hover:flex flex-col bg-white p-4 mt-2 rounded-lg shadow-lg border transition-all duration-300 ease-in-out z-10">
                  <Link
                    href="/profile"
                    className="hover:bg-gray-100 p-2 rounded"
                  >
                    Profile
                  </Link>
                  <Link href="/cart" className="hover:bg-gray-100 p-2 rounded">
                    Cart
                  </Link>
                  <Link
                    href="/orders"
                    className="hover:bg-gray-100 p-2 rounded"
                  >
                    Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="hover:bg-gray-100 p-2 rounded text-left"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
            <ul className="flex  gap-2">
              <li className="mx-1">
                <Link href="/favorite">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </Link>
              </li>
              <li>
                <div className="group -m-2 flex items-center p-2">
                  <ShoppingBagIcon
                    onClick={openCart}
                    className="h-6 w-6 flex-shrink-0 text-gray-800 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {item.length}
                  </span>
                  <span className="sr-only">items in cart, view bag</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Cart open={cartOpen} close={closeCart} />
      <nav className={styles.mobileMenu}>
        <div className="flex items-center justify-center gap-10 p-4 text-md">
          <button onClick={openMobileMenu} className={styles.Menu}>
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
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          <Link href={"/favorite"}>
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
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </Link>
          <Link href={"/"}>DIVINE</Link>
          <button>
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
          </button>
          <Link href={"/cart"}>
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
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </Link>
        </div>
      </nav>

      <div  className={`${styles.MobileMenuLink} ${mobileMenu?styles.openMenu:""}`}>
        <button onClick={closeMobileMenu} className={styles.Close}>
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
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        <Link className={styles.MobileLogo} href={"/"}>
          DIVINE
        </Link>
        <ul>
          <li
          
            className="flex items-center  justify-between w-full"
          >
            <Link onClick={openMenu} href={""}>MENS</Link>
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </li>
          <li className="flex items-center  justify-between w-full">
            <Link href={""}>All</Link>
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </li>{" "}
          <li className="flex items-center  justify-between w-full">
            <Link href={""}>Winter</Link>
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </li>
          <li>
            <Link href={""}>Tops</Link>
          </li>
          <li>
            <Link href={""}>Bottoms</Link>
          </li>
          <li>
            <Link href={""}>Sale</Link>
          </li>
        </ul>
      </div>
      <div className={`${styles.MobileMenuLink2} ${
          menu1 ? styles.openMenu1 : ""
        }`}>
        <button onClick={closeMenu} className={styles.Close}>
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
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        <Link className={styles.MobileLogo} href={"/"}>
          DIVINE
        </Link>
        <ul>
          <li className="flex items-center  justify-between w-full">
            <Link href={""}>T shirts</Link>
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </li>
          <li className="flex items-center  justify-between w-full">
            <Link href={""}>Polo</Link>
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </li>{" "}
          <li className="flex items-center  justify-between w-full">
            <Link href={""}>Winter</Link>
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </li>
          <li>
            <Link href={""}>Joggers</Link>
          </li>
          <li>
            <Link href={""}>Sneakers</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
