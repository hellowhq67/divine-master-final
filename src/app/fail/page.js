import React from 'react';
import Nav from "@/components/Navbar/Nav";
import Link from "next/link";

const Page = () => {
    return (
        <>
            <Nav />
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-center bg-white p-6 rounded-lg shadow-md">
                    <img className="w-24 mx-auto mb-4" src="/images/fail.svg" alt="Payment Failed" />
                    <h6 className="text-lg font-semibold text-red-600 mb-2">Payment Failed</h6>
                    <Link href="/">
                        <p className="inline-block px-6 py-2 mt-4 bg-red-600 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Try Again</p>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Page;
