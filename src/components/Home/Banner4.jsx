import React from 'react'
import Img from '../../assests/poster/bng.png'
import Image from 'next/image'
export default function Banner4() {
  return (
    <div>
      <Image src={Img} style={{width:"100vw", height:"100%" ,objectFit:"contain"}}/>
    </div>
  )
}
