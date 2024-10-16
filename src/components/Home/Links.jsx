import { Link } from '@mui/material'
import React from 'react'

export default function Links() {
    const data =[
        {
            name:" T-Shirts",
            link:"/category/tops"

        },
        {
            name:" Drop Shoulder",
            link:"/category/dropshoulder"

        },
        {
            name:" Hoddie",
            link:"/category/hoddie"

        },
        {
            name:"Bottoms",
            link:"/category/bottom"

        },
        {
            name:"Activewear",
            link:"/category/activewear"

        },
        {
            name:"Footwear",
            link:"/category/footwear"

        },
        
    ]
  return (
    <div className='flex w-screen flex-col lg:h-80 items-start px-4 my-20 sm:px-4 lg:px-8 '>
      <h1 className='text-3xl my-10 font-semibold font-sans ' >POPULAR RIGHT NOW</h1>

      <div className="flex  w-screen flex-wrap gap-20 sm:h-full lg:h-screen">
        {data.map((x)=>{
            return(
                <Link style={{width:'250px'}} className='h-10 text-2xl font-bold  text-black no-underline border-b-2 border-black hover:border-b-4 font-sans' href={x.link}>
                    {x.name}
                </Link>
            )
        })

        }
      </div>
    </div>
  )
}
