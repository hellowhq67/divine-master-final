import Link from "next/link";

export default function Footer() {
  const navItems = {
 
 
    platform: [
      { name: "Terms & Privacy", link: "/policy/terms-policy" },
      { name: "Shipping Policy", link: "/policy/shipping-policy" },
      { name: "Return&Refund", link: "/policy/return-refund" },
      { name: "Track Order", link: "/track" },
      { name: "Pricing", link: "/policy/pricing" },
      { name: "FAQ", link: "/policy/faq" },
      

      
    ],
    contact: [
      { name: "Send a Message", link: "/contact" },
      { name: "+33758421255", link: "+33758421255" },
      { name: "+8801629219782", link: "+33758421255" },
      { name: "divineapparel@gmail.com", link: "+33758421255" },
    ],
    men: [
      { name: "Tops", link: "/men/tops" },
      { name: "T-shirt", link: "/men/tshirt" },
      { name: "Polos", link: "/men/polos" },
    ],
    support: [
      { name: "Contact Support", link: "/contact" },
    
    ],
  };

  const socialIcons = [
    {
      svgPath:
        "M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951",
      label: "Facebook",
      link: "https://www.facebook.com/profile.php?id=61559415209737",
    },
   

    {
      svgPath:
        "M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334",
      label: "Instagram",
      link: "",
    },


  ];

  return (
    <footer className="w-full text-gray-700 bg-black body-font mt-20">
      <div className="container flex flex-col flex-wrap px-5 py-24 mx-auto md:items-center lg:items-start md:flex-row md:flex-no-wrap">
        <div className="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
          <Link href="/" className="flex items-center justify-center font-medium text-white title-font md:justify-start">
            DIVINE MENSWEAR
          </Link>
          <p className="mt-2 text-sm text-white">
            Elevate your style with Divine, where quality meets sophistication for the modern man.
          </p>
          <div className="mt-4">
            <span className="inline-flex justify-center mt-2 sm:ml-auto sm:mt-0 sm:justify-start">
              {socialIcons.map((icon, index) => (
                <a
                  key={index}
                  href={icon.link}
                  className="text-white cursor-pointer hover:text-gray-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d={icon.svgPath}></path>
                  </svg>
                </a>
              ))}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap flex-grow mt-10 -mb-10 text-center md:pl-20 md:mt-0 md:text-left">
          {Object.keys(navItems).map((section, idx) => (
            <div key={idx} className="w-full px-4 lg:w-1/4 md:w-1/2">
              <h2 className="mb-3 text-sm font-medium tracking-widest text-white uppercase title-font">
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </h2>
              <nav className="mb-10 list-none">
                {navItems[section].map((item, index) => (
                  <li key={index} className="mt-3">
                    <Link href={item.link} className="text-white cursor-pointer hover:text-white">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-300">
        <div className="container px-5 py-4 mx-auto">
          <p className="text-sm text-gray-700 capitalize xl:text-center">
            © 2024 All rights reserved {"DIVINE APPAREL"}
          </p>
        </div>
      </div>
    </footer>
  );
}
