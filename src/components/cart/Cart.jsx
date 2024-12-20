"use client";
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { remove, incrementQuantity, decrementQuantity, selectTotalPrice, selectTotalQuantity,selectTotalPriceEUR  } from '@/redux/Cartslice';
import Link from 'next/link';
import { useDispatch, useSelector } from "react-redux";
import { setCurrency, selectCurrency } from "@/redux/currencySlice";

export default function Cart({ open, close }) {
  const dispatch = useDispatch();
  const cartitems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector(selectTotalPrice);
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalPriceEUR = useSelector(selectTotalPriceEUR);
  const currency = useSelector(selectCurrency);

  const handleRemove = (id) => {
    dispatch(remove(id));
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog className="relative z-10" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => close()}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cartitems.map((product) => (
                              <li key={product._id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.productImage1}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={product.href}>{product.productName}</a>
                                      </h3>
                                      <p className="ml-4">{currency=="USD"?product.priceUsd:(product.smartPrice ? product.smartPrice : product.price) } {currency=='USD'?('USD'):('BDT')}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{product.size}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className="flex">
                                      <button
                                        onClick={() => handleDecrement(product._id)}
                                        type="button"
                                        className="font-medium text-black hover:text-gray-900"
                                      >
                                        -
                                      </button>
                                      <span className="mx-2">{product.quantity}</span>
                                      <button
                                        onClick={() => handleIncrement(product._id)}
                                        type="button"
                                        className="font-medium text-black hover:text-gray-900"
                                      >
                                        +
                                      </button>
                                    </div>
                                    <div className="flex">
                                      <button
                                        onClick={() => handleRemove(product._id)}
                                        type="button"
                                        className="font-medium text-black hover:text-gray-900"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>{currency=="USD"?('USD'):('BDT')} {currency=="USD"?(totalPriceEUR.toFixed(2)) :(totalPrice.toFixed(2))}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Total Quantity: {totalQuantity}</p>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <Link 
                          href={`${currency=="USD"?'/checkout/stripe-checkout':'/checkout'}`}
                          className="flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm "
                        >
                          Checkout
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="font-medium text-gray-600 hover:text-gray-950"
                            onClick={() => close()}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
