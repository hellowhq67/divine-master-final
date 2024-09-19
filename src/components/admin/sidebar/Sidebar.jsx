"use client";
import Link from "next/link";
import React, { useState } from "react";
import Navigation from "@/components/admin/navigation/Navigation";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Sidebar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDropdownOpen2, setDropdownOpen2] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleDropdown2 = () => {
    setDropdownOpen2(!isDropdownOpen2);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!isUserMenuOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                onClick={toggleSidebar}
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="https://flowbite.com" className="flex ms-2 md:me-24">
            
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  DIVINE ADMIN PANEL
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3 ">
              <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="h-8 w-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <Link  href="/admin/products/table" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                   Products
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link  href="/admin/orders" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                    Orders
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link  href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                    Sign out
                  </Link>
                </MenuItem>
              </MenuItems>
            </Menu>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link 
                href="/admin/dashboard"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
                onClick={toggleDropdown}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 21"
                >
                  <path d="M15 12a1 1 0 0 0-1 1v5H4v-5a1 1 0 0 0-2 0v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1Z" />
                  <path d="M16 5h-3V2a2 2 0 0 0-4 0v3H6a4 4 0 0 0-1 7.874V16a1 1 0 0 0 2 0v-3a1 1 0 0 0-1-1 2 2 0 1 1 2 2 1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1 2 2 0 1 1 2-2 1 1 0 0 0-1 1v3a1 1 0 0 0 2 0v-3.126A4 4 0 0 0 16 5Zm-5 0h-2V2a1 1 0 1 1 2 0v3Z" />
                </svg>
                <span className="flex-1 ms-3 text-left whitespace-nowrap">
                  E-commerce
                </span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.19l3.71-3.96a.75.75 0 111.08 1.04l-4.24 4.52a.75.75 0 01-1.08 0L5.21 8.25a.75.75 0 01.02-1.04z"
                  />
                </svg>
              </button>
              <ul
                id="dropdown-example"
                className={`${
                  isDropdownOpen ? "block" : "hidden"
                } py-2 space-y-2`}
              >
                <li>
                  <a
                    href="/admin/products/table"
                    className="flex items-center w-full p-2 text-sm text-gray-900 transition duration-75 rounded-lg ps-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <Link
                    href="/admin/billing"
                    className="flex items-center w-full p-2 text-sm text-gray-900 transition duration-75 rounded-lg ps-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Billing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/products/invoice"
                    className="flex items-center w-full p-2 text-sm text-gray-900 transition duration-75 rounded-lg ps-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Invoice
                  </Link>
                </li>
              </ul>
            </li>


            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
                onClick={toggleDropdown2}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 21"
                >
                  <path d="M15 12a1 1 0 0 0-1 1v5H4v-5a1 1 0 0 0-2 0v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1Z" />
                  <path d="M16 5h-3V2a2 2 0 0 0-4 0v3H6a4 4 0 0 0-1 7.874V16a1 1 0 0 0 2 0v-3a1 1 0 0 0-1-1 2 2 0 1 1 2 2 1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1 2 2 0 1 1 2-2 1 1 0 0 0-1 1v3a1 1 0 0 0 2 0v-3.126A4 4 0 0 0 16 5Zm-5 0h-2V2a1 1 0 1 1 2 0v3Z" />
                </svg>
                <span className="flex-1 ms-3 text-left whitespace-nowrap">
                 CURD
                </span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.19l3.71-3.96a.75.75 0 111.08 1.04l-4.24 4.52a.75.75 0 01-1.08 0L5.21 8.25a.75.75 0 01.02-1.04z"
                  />
                </svg>
              </button>
              <ul
                id="dropdown-example"
                className={`${
                  isDropdownOpen2 ? "block" : "hidden"
                } py-2 space-y-2`}
              >
                <li>
                  <a
                    href="/admin/forms"
                    className="flex items-center w-full p-2 text-sm text-gray-900 transition duration-75 rounded-lg ps-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Add Products
                  </a>
                </li>
                <li>
                  <Link
                    href="/admin/forms/users"
                    className="flex items-center w-full p-2 text-sm text-gray-900 transition duration-75 rounded-lg ps-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Add users
                  </Link>
                </li>
             
              </ul>
            </li>



            <li>
              <Link
                href="/admin/user"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">USERS</span>
              </Link>
            </li>


            <li>
              <Link
                href="/admin/orders"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Orders</span>
              </Link>
            </li>

            <li>
              <Link
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Reports</span>
              </Link>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M8.5 0A4.5 4.5 0 0 0 4 4.5a.5.5 0 0 1-1 0A5.5 5.5 0 0 1 8.5-1a.5.5 0 0 1 0 1ZM9.54 6H6.46a.5.5 0 0 1-.46-.31l-3-7A.5.5 0 0 1 3.54 0h12.92a.5.5 0 0 1 .45.69l-3 7a.5.5 0 0 1-.45.31h-3.08a.5.5 0 1 1-.45-.69l1.33-3.11H8.12l1.32 3.1a.5.5 0 0 1-.46.69ZM4.5 8a.5.5 0 0 0 0 1H8.46a.5.5 0 0 0 .46-.31l1.71-4a.5.5 0 0 1 .46-.31h1.74a.5.5 0 0 1 .45.69L11.04 9h3.46a.5.5 0 0 0 .5-.5v-1A4.5 4.5 0 0 1 10.5 0a4.5 4.5 0 0 1-6 6.45A.5.5 0 0 0 4 7h6a.5.5 0 0 0 .46-.31L12 3h-4.25L5 7a.5.5 0 0 0-.5 1Z" />
                  <path d="M5 5.75A3.75 3.75 0 0 1 8.75 9.5a.5.5 0 0 0 0-1A2.75 2.75 0 0 0 6 5.75a.5.5 0 1 0-1 0Zm11 0A3.75 3.75 0 0 1 19.75 9.5a.5.5 0 0 0 0-1A2.75 2.75 0 0 0 17 5.75a.5.5 0 1 0-1 0Z" />
                </svg>
                <span className="ms-3">Inbox</span>
                <span className="inline-flex justify-center items-center ms-2 w-3 h-3 p-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  3
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
