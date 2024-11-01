import { Inter } from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import Prvider from '@/redux/Prvider'
import { AuthContextProvider } from "./context/AuthContext";
import { GoogleAnalytics } from '@next/third-parties/google'
const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "Divine MensWear - Luxury Men's Fashion in Bangladesh & France",
  description: "Explore Divine MensWear, a premium clothing brand for modern men, offering stylish and high-quality apparel in Bangladesh and France. Shop our collection now!",
  keywords: "Luxury Men's Fashion, Premium Clothing, Divine MensWear, Men's Clothing Bangladesh, Men's Fashion France",
  author: "Divine MensWear",
  robots: "index, follow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta name="robots" content={metadata.robots} />
        <title>{metadata.title}</title>
        {/* Hreflang Tags for Geo-targeting */}
        <link rel="alternate" href="https://divinemenswear.com/" hreflang="en" />
        <link rel="alternate" href="https://divinemenswear.com/bd" hreflang="bn" />
        <link rel="alternate" href="https://divinemenswear.com/fr" hreflang="fr" />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
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
