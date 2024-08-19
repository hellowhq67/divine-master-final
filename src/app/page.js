import Banner from "@/components/Home/Banner";
import Banner2 from "@/components/Home/Banner2";
import Poster from "@/components/Home/Poster";
import Cards from "@/components/Home/Cards";
import Featured from "@/components/Home/Featured";
import Nav from "@/components/Navbar/Nav";
import Image from "next/image";
import Fetured from "@/components/Fetured/Fetured";
import Footer from "@/components/Footer/Footer";

export default async function Home() {
  return (
    <>
      <Nav />
      <Banner />
      <Poster/>
      <Featured />
      <Fetured />
      <Banner2/>
      <Footer />
    </>
  );
}
