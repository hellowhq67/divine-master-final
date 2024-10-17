import Nav from '@/components/Navbar/Navigation'
import React from 'react'
import Products from '@/components/Cetagory/Products'
export default function page({ params: { category } }) {
  return (
    <div>
      <Navigation/>
      <Products  category={category}/>
    </div>
  )
}
