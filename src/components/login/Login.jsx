"use client";
import React, { useEffect, useState } from "react";
import { UseAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import Nav from "../Navbar/Nav";
import Footer from "../Footer/Footer";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
export default function Login() {
  const { user, loginWithEmailPassword, facebookSignIn, googleSignIn } =
    UseAuth();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const singIn = await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignInWithFb = async () => {
    try {
      await facebookSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handelSingUp = async () => {
    try {
      const isSignedUp = await loginWithEmailPassword(email, password);
      if (isSignedUp) {
        toast("User created successfully");
      } else {
        toast("Failed to create user");
      }
    } catch (error) {
      console.log("SignUp Error:", error.message);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handelSingUp();
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
      {!user ? (
        <>
          <ToastContainer />
          <div class="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div class="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
              <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                <div class="mt-12 flex flex-col items-center">
                  <h1 class="text-2xl xl:text-3xl font-extrabold">
                    Login With DIVINE
                  </h1>
                  <div class="w-full flex-1 mt-8">
                    <div class="flex flex-col items-center">
                      <button
                        onClick={handleSignIn}
                        class="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-black text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                      >
                        <div class="bg-white p-2 rounded-full">
                          <svg class="w-4" viewBox="0 0 533.5 544.3">
                            <path
                              d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                              fill="#4285f4"
                            />
                            <path
                              d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                              fill="#34a853"
                            />
                            <path
                              d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                              fill="#fbbc04"
                            />
                            <path
                              d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                              fill="#ea4335"
                            />
                          </svg>
                        </div>
                        <span class="ml-4">Sign Up with Google</span>
                      </button>
                    </div>
                    <div class="flex flex-col items-center my-2">
                      <button
                        onClick={handleSignInWithFb}
                        class="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-black text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                      >
                        <div class="bg-white p-2 rounded-full">
                          <img
                            width={20}
                            src="data:image/png;base64,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"
                            alt=""
                          />
                        </div>
                        <span class="ml-4">Sign Up with Facebook</span>
                      </button>
                    </div>
                   
                  </div>
                  <div class="w-full flex-1 mt-8">
                    <div class="my-12 border-b text-center">
                      <div class="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                        Login with e-mail
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="mx-auto max-w-xs">
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="mt-5 tracking-wide font-semibold bg-black text-gray-100 w-full py-4 rounded-lg hover:bg-gray-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                      >
                        <svg
                          className="w-6 h-6 -ml-2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                          <circle cx="8.5" cy="7" r="4" />
                          <path d="M20 8v6M23 11h-6" />
                        </svg>
                        <span className="ml-3">Login</span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                <div
                  className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                  style={{
                    backgroundImage:
                      "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </>
      ) : (
        router.push("/profile")
      )}
    </>
  );
}
