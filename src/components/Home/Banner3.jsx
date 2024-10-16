import React from 'react'
import styles from './style.module.css'
import Link from 'next/link'

export default function Banner3() {
  return (
    <div className={styles.Banner3}>
      <div className="flex items-center w-full justify-center gap-2 text-center px-4 flex-col lg:flex-row">
        <h1 className="md:text-4xl lg:text-4xl sm:text-2xl font-bold">
          Become a Member & get up to 40% off
        </h1>
        <Link
          className="bg-black text-white px-4 py-2 flex items-center btn"
          href="/registration"
        >
          Sign Up For Free
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  )
}
