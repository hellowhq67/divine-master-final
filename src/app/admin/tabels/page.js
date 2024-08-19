import ProductTable from "@/components/admin/tabels/ProductTabel";
import Link from "next/link";

export default async function Home() {


  return (
    <div className="container">
     <ProductTable/>
    </div>
  );
}

