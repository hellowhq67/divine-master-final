
import Nav from "@/components/Navbar/Nav";
import Banner from "@/components/Home/Banner";
import Poster from "@/components/Home/Poster";
import Featured from "@/components/Home/Featured";
import Footer from "@/components/Footer/Footer";
import Banner2 from "@/components/Home/Banner2";
import Fetured from "@/components/Fetured/Fetured";

export default function Home() {


  return (
    <>
      <Nav />
      <div className="my-14">
        <Banner />
        <Poster />
        <Featured />
        <Fetured />
        <Banner2 />
      </div>
     
      <Footer />
    </>
  );
}
