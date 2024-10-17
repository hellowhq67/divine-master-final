import { Inter } from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import Prvider from '@/redux/Prvider'
import { AuthContextProvider } from "./context/AuthContext";
import { GoogleAnalytics } from '@next/third-parties/google'
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DIVINE",
  description: "NEXT 14",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
        <meta name="google-site-verification" content="lC96oNZnVPF_VMoOpS7vjHVYdUvSx0jTx1ky7Khd6g0" />
      </head>
      <body className={inter.className}>
       <Prvider>

       <AuthContextProvider>{children}</AuthContextProvider>
       </Prvider>
      </body>
     <GoogleAnalytics gaId="G-22PRTGLZST" />
    </html>
  );
}
