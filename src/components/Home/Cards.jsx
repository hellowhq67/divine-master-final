import React from "react";
import f1 from '@/assests/features/f1.png'
import f2 from '@/assests/features/f2.png'
import f3 from '@/assests/features/f3.png'
import f4 from '@/assests/features/f4.png'

const data = [
  {
  img:f1,
    link: "",
    title: "",
  },
  {
  img:f2,
    link: "",
    title: "",
  },
  {
  img:f3,
    link: "",
    title: "",
  },
  {
  img:f4,
    link: "",
    title: "",
  },
];
function Cards() {
  return (

  <>
   <div className="flex items-center justify-center gap-10 flex-row w-full h-full p-10">
  {data.map((x)=>{

    return(
     
      <div>
        <img src={x.img.src} alt="" />
      </div>

    )
  })}
  </div>
  </>




  
  

  );
}

export default Cards;
