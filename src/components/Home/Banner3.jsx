import React from 'react'
import styles from './style.module.css'
import Link from 'next/link'
export default function Banner3() {
  return (
    <div  className={styles.Banner3}>
      <div className='flex items-center w-full justify-center gap-2'><h1 className='md:text-4xl lg:text-4xl sm:text-xl font-bold'>{`Become a Member & get upto  40% off`}</h1> <Link className='bg-black text-white px-4 py-2 flex items-center' href='/registration'>SignUp For free<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
</svg>
</Link></div>
    </div>
  )
}
