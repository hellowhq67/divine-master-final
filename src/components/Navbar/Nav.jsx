"use client";
import { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  Popover,
  Tab,
  Transition,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Header from "./Header";
import Cart from "../cart/Cart";
import Navprofile from "./Navprofile";
import { getAuth } from "firebase/auth";
import { UseAuth } from "@/app/context/AuthContext";
import { useSelector } from "react-redux";
import axios from "axios";
const navigation = {
  categories: [
    {
      id: "MEN",
      name: "MEN",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "Artwork Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg",
          imageAlt:
            "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Cetagory",
          items: [
            { name: "Tops", href: "/category/tops" },
            { name: "Bottoms", href: "/category/bottoms" },
            { name: "Activewear", href: "/category/activewear" },
            { name: "Footwear", href: "/category/footwear" },
            { name: "Accessories", href: "/category/accessories" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "#" },
            { name: "Wallets", href: "#" },
            { name: "Bags", href: "#" },
            { name: "Sunglasses", href: "#" },
            { name: "Hats", href: "#" },
            { name: "Belts", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Re-Arranged", href: "#" },
            { name: "Counterfeit", href: "#" },
            { name: "Full Nelson", href: "#" },
            { name: "My Way", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "BLOG", href: "#" },
    { name: "COLLECTIONS", href: "/products" },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav() {
  const { user, logOut } = UseAuth();
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const userID = user ? user.uid : null;
  const item = useSelector((state) => state.cart.items);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const [productsResponse] = await Promise.all([
          axios.get("/api/admin/products/all"),
        ]);

        setProducts(productsResponse.data.products);

        setFilteredProducts(productsResponse.data.products);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);
  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);
  const handelLogout = async () => {
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
          alert("user deleted");
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
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);
  return (
    <>
      <div className=" bg-white">
        {/* Mobile menu */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog className="fixed  z-40 lg:hidden" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                  <div className="flex px-4 pb-2 pt-5">
                    <button
                      type="button"
                      className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                      onClick={() => setOpen(false)}
                    >
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Links */}
                  <Tab.Group as="div" className="mt-2">
                    <div className="border-b border-gray-200">
                      <Tab.List className="-mb-px flex space-x-8 px-4">
                        {navigation.categories.map((category) => (
                          <Tab
                            key={category.name}
                            className={({ selected }) =>
                              classNames(
                                selected
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-gray-900",
                                "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                              )
                            }
                          >
                            {category.name}
                          </Tab>
                        ))}
                      </Tab.List>
                    </div>
                    <Tab.Panels as={Fragment}>
                      {navigation.categories.map((category) => (
                        <Tab.Panel
                          key={category.name}
                          className="space-y-10 px-4 pb-8 pt-10"
                        >
                          <div className="grid grid-cols-2 gap-x-4">
                            {category.featured.map((item) => (
                              <div
                                key={item.name}
                                className="group relative text-sm"
                              >
                                <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                  <img
                                    src={item.imageSrc}
                                    alt={item.imageAlt}
                                    className="object-cover object-center"
                                  />
                                </div>
                                <a
                                  href={item.href}
                                  className="mt-6 block font-medium text-gray-900"
                                >
                                  <span
                                    className="absolute inset-0 z-10"
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                                <p aria-hidden="true" className="mt-1">
                                  Shop now
                                </p>
                              </div>
                            ))}
                          </div>
                          {category.sections.map((section) => (
                            <div key={section.name}>
                              <p
                                id={`${category.id}-${section.id}-heading-mobile`}
                                className="font-medium text-gray-900"
                              >
                                {section.name}
                              </p>
                              <ul
                                role="list"
                                aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                className="mt-6 flex flex-col space-y-6"
                              >
                                {section.items.map((item) => (
                                  <li key={item.name} className="flow-root">
                                    <a
                                      href={item.href}
                                      className="-m-2 block p-2 text-gray-500"
                                    >
                                      {item.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </Tab.Panel>
                      ))}
                    </Tab.Panels>
                  </Tab.Group>

                  <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                    {navigation.pages.map((page) => (
                      <div key={page.name} className="flow-root">
                        <a
                          href={page.href}
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          {page.name}
                        </a>
                      </div>
                    ))}
                  </div>
                  {!user ? (
                    <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                      <div className="flow-root">
                        <Link
                          href="/login"
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Sign in
                        </Link>
                      </div>
                      <div className="flow-root">
                        <Link
                          href="/registration"
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Create account
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Link
                        href="/profile"
                        className={classNames(
                          focus ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        {user ? user.displayName : null}
                      </Link>
                    </>
                  )}

                  <div className="border-t border-gray-200 px-4 py-6">
                    <a href="#" className="-m-2 flex items-center p-2">
                      <img
                        src="https://tailwindui.com/img/flags/flag-canada.svg"
                        alt=""
                        className="block h-auto w-5 flex-shrink-0"
                      />
                      <span className="ml-3 block text-base font-medium text-gray-900">
                        CAD
                      </span>
                      <span className="sr-only">, change currency</span>
                    </a>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <header className="fixed w-screen z-10  top-0 bg-white">
          <nav
            aria-label="Top"
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          >
            <div className="border-b border-gray-200">
              <div className="flex h-16 items-center">
                <button
                  type="button"
                  className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                  onClick={() => setOpen(true)}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Logo */}
                <div className="ml-4 flex lg:ml-0">
                  <Link className="text-2xl font-bold" href="/">
                    DIVINE
                  </Link>
                </div>

                {/* Flyout menus */}
                <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                  <div className="flex h-full space-x-8">
                    {navigation.categories.map((category) => (
                      <Popover key={category.name} className="flex">
                        {({ open }) => (
                          <>
                            <div className="relative flex">
                              <Popover.Button
                                className={classNames(
                                  open
                                    ? "border-indigo-600 text-indigo-600"
                                    : "border-transparent text-gray-700 hover:text-gray-800",
                                  "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                                )}
                              >
                                {category.name}
                              </Popover.Button>
                            </div>

                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                                {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                <div
                                  className="absolute inset-0 top-1/2 bg-white shadow"
                                  aria-hidden="true"
                                />

                                <div className="relative bg-white">
                                  <div className="mx-auto max-w-7xl px-8">
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                      <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                        {category.featured.map((item) => (
                                          <div
                                            key={item.name}
                                            className="group relative text-base sm:text-sm"
                                          >
                                            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                              <img
                                                src={item.imageSrc}
                                                alt={item.imageAlt}
                                                className="object-cover object-center"
                                              />
                                            </div>
                                            <a
                                              href={item.href}
                                              className="mt-6 block font-medium text-gray-900"
                                            >
                                              <span
                                                className="absolute inset-0 z-10"
                                                aria-hidden="true"
                                              />
                                              {item.name}
                                            </a>
                                            <p
                                              aria-hidden="true"
                                              className="mt-1"
                                            >
                                              Shop now
                                            </p>
                                          </div>
                                        ))}
                                      </div>
                                      <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                        {category.sections.map((section) => (
                                          <div key={section.name}>
                                            <p
                                              id={`${section.name}-heading`}
                                              className="font-medium text-gray-900"
                                            >
                                              {section.name}
                                            </p>
                                            <ul
                                              role="list"
                                              aria-labelledby={`${section.name}-heading`}
                                              className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                            >
                                              {section.items.map((item) => (
                                                <li
                                                  key={item.name}
                                                  className="flex"
                                                >
                                                  <a
                                                    href={item.href}
                                                    className="hover:text-gray-800"
                                                  >
                                                    {item.name}
                                                  </a>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Popover.Panel>
                            </Transition>
                          </>
                        )}
                      </Popover>
                    ))}

                    {navigation.pages.map((page) => (
                      <a
                        key={page.name}
                        href={page.href}
                        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        {page.name}
                      </a>
                    ))}
                  </div>
                </Popover.Group>
                    {/* Search */}
                   

                <div className="ml-auto flex items-center">
                  {!user ? (
                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                      <Link href={"/login"}>Sign in</Link>
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                      <Link href={"/registration"}>Create Accont</Link>
                    </div>
                  ) : (
                    <>
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <MenuButton className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <p>{user ? user.displayName : null}</p>
                          </MenuButton>
                        </div>
                        <MenuItems
                          transition
                          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                          <MenuItem>
                            {({ focus }) => (
                              <Link
                                href="/profile"
                                className={classNames(
                                  focus ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {user ? user.displayName : null}
                              </Link>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ focus }) => (
                              <Link
                                href="/profile"
                                className={classNames(
                                  focus ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Orders
                              </Link>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ focus }) => (
                              <form>
                                <button
                                  className={classNames(
                                    focus ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                  onClick={handelLogout}
                                >
                                  Logout
                                </button>
                              </form>
                            )}
                          </MenuItem>
                        </MenuItems>
                      </Menu>
                    </>
                  )}

              
                  {/* Cart */}
                  <div className="ml-4 flow-root lg:ml-6">
                    <a href="#" className="group -m-2 flex items-center p-2">
                      <ShoppingBagIcon
                        onClick={openCart}
                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                        {item.length}
                      </span>
                      <span className="sr-only">items in cart, view bag</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>

      <Cart open={cartOpen} close={closeCart} />
    </>
  );
}
