import React from 'react'
import B10 from '@/assests/banner/b10.jpg'
import B16 from '@/assests/banner/b16.jpg'
import Link from 'next/link'
import Poster1 from '../../assests/poster/poster1.jpg'
import Poster2 from '../../assests/poster/poster2.png'
import Poster3 from '../../assests/poster/poster3.jpg'
import Image from 'next/image'
function Poster() {

  const data =[
    {
      img:Poster1,
      link:"/category/tops",
      title:"Drop Shoulder"
    },
    {
    img:Poster2,
    link:"/category/winter",
    title:"Winter Arrival",
    },
    {
      img:Poster3,
      link:"/cetagory/tops",
      title:"Luxry Polo"
      },
  ]
  return (
    <div className=' flex w-screen gap-2 items-center justify-center px-2  h-full overflow-hidden flex-wrap'>
      {data.map((x)=>{
        return(
          <Link href={x.link} className='relative'>
          <Image style={{width:"390px",height:'500px',objectFit:"cover"}}src={x.img} alt="" />
    

          </Link>
        )
      })

      }
     
    </div>
  )
}

export default Poster
