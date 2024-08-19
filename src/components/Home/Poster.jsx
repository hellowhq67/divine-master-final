import React from 'react'
import B10 from '@/assests/banner/b10.jpg'
import B16 from '@/assests/banner/b16.jpg'

function Poster() {
  return (
    <div className='flex items-center justify-center w-full h-full '>
      <div  className=' p-2'>
        <img className='object-contain w-full h-full rounded-md' src={B10.src}alt="" />
      </div>
      <div className=' p-2'>
        <img className='object-contain w-full h-full rounded-md'  src={B16.src}alt="" />
      </div>
    </div>
  )
}

export default Poster
