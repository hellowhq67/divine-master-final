import { Inter } from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import Prvider from '@/redux/Prvider'
import { AuthContextProvider } from "./context/AuthContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DIVINE",
  description: "NEXT 14",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
       <Prvider>

       <AuthContextProvider>{children}</AuthContextProvider>
       </Prvider>
      </body>
    </html>
  );
}
