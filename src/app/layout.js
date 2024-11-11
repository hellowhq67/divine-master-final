
import { Inter } from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import Prvider from '@/redux/Prvider';
import { AuthContextProvider } from "./context/AuthContext";
const inter = Inter({ subsets: ["latin"] });
import { GoogleTagManager,GoogleAnalytics } from '@next/third-parties/google'
import Script from "next/script";
export const metadata = {
  title: "Divine MensWear - Luxury Men's Fashion in Bangladesh & France",
  description: "Explore Divine MensWear, a premium clothing brand for modern men, offering stylish and high-quality apparel in Bangladesh and France. Shop our collection now!",
  keywords: "Luxury Men's Fashion, Premium Clothing, Divine MensWear, Men's Clothing Bangladesh, Men's Fashion France",
  author: "Divine MensWear",
  robots: "index, follow",
};

export default function RootLayout({ children }) {

  const FACEBOOK_PIXEL_ID = '914051926996452';

  return (
    <html lang="en">
      {/* SEO Metadata */}
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta name="robots" content={metadata.robots} />
        <title>{metadata.title}</title>
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window,document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FACEBOOK_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>
      <GoogleAnalytics gaId="G-22PRTGLZST" />
      <GoogleTagManager gtmId="GTM-M8MCP2K6" />

      <body  className={inter.className}>
        <Prvider>
          <AuthContextProvider>{children}</AuthContextProvider>
        </Prvider>
      </body>
    </html>
  );
}
