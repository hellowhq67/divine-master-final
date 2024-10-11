import React from "react";
import Link from "next/link";

const data = [
  {
    img: "https://img.freepik.com/free-photo/ai-generated-concept-human_23-2150688449.jpg?t=st=1722332047~exp=1722335647~hmac=fb17f40932338f5e70f4b0ca6b692033ed0fb863386d0c0ad2e047d9d023aeb2&w=360",
    link: "",
    title: "Streetwear Collection",
  },
  {
    img: "https://img.freepik.com/free-photo/portrait-man-going-out-shopping-various-consumer-goods_23-2151669761.jpg?t=st=1722331361~exp=1722334961~hmac=112271a7986cf43f11e7a49717460147104a7266b22095a0b3eeabef373676cc&w=360",
    link: "",
    title: "Limited Edition",
  },
  {
    img: "https://img.freepik.com/free-photo/ai-generated-concept-human_23-2150688457.jpg?t=st=1722332000~exp=1722335600~hmac=1c8ff087864f4c0b707fe399b27b0641217bec3c9a9a55a2eee4a007428b6f47&w=360",
    link: "",
    title: "Designer Artwear",
  },
  {
    img: "https://img.freepik.com/free-photo/portrait-person-daily-life-new-york-city_23-2150819948.jpg?t=st=1722331720~exp=1722335320~hmac=e416c58c4bb0b7d79bdb29c84766788886917cc4a6c4762daa0f7b72d15f01a1&w=360",
    link: "",
    title: "Luxury Street Style",
  },

];

function Cards() {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {data.map((x, index) => (
        <Link key={index} href="/products" className="relative cursor-pointer w-40 h-60 md:w-48 md:h-72 lg:w-60 lg:h-80">
          <img
            className="w-full h-full object-cover rounded-md"
            src={x.img}
            alt=""
          />
          <h2 className="absolute bottom-2 left-2 text-sm md:text-lg lg:text-xl font-bold text-white bg-black bg-opacity-50 px-2 rounded">
            {x.title}
          </h2>
        </Link>
      ))}
    </div>
  );
}

export default Cards;
