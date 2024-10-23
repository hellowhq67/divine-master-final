
import Nav from "@/components/Navbar/Nav";
import Banner from "@/components/Home/Banner";
import Poster from "@/components/Home/Poster";
import Featured from "@/components/Home/Featured";
import Footer from "@/components/Footer/Footer";
import Banner2 from "@/components/Home/Banner2";
import Banner3 from "@/components/Home/Banner3";
import Banner4 from "@/components/Home/Banner4";

import Fetured from "@/components/Fetured/Fetured";
import Navigation from '@/components/Navbar/Navigation'
import Links from '@/components/Home/Links'
import Messenger from "../components/Chatbot/Messenger";
export default function Home() {


  return (
    <>
      <Navigation/>
      <div className="">
        <Banner />
        <Banner2 />
        <Links/>
        <Poster/>
        <Fetured />
      
        <Banner3/>
       
      </div>
     
      <Footer />
      <Messenger/>
   
    </>
  );
}
