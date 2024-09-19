import Nav from '@/components/Navbar/Nav'
import React from 'react'
import Products from '@/components/Cetagory/Products'
export default function page({ params: { category } }) {
  return (
    <div>
      <Nav/>
      <Products  category={category}/>
    </div>
  )
}
