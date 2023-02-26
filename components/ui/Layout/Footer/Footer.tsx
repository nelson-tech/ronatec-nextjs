import AtSymbolIcon from "@heroicons/react/20/solid/AtSymbolIcon"
import GlobeAltIcon from "@heroicons/react/20/solid/GlobeAltIcon"
import LocationMarkerIcon from "@heroicons/react/20/solid/MapPinIcon"
import PhoneIcon from "@heroicons/react/20/solid/PhoneIcon"
import PrinterIcon from "@heroicons/react/20/solid/PrinterIcon"

import Image from "next/image"
import MenuLink from "@components/Link"

// ####
// #### Component
// ####

const navigation = {
  solutions: [
    { name: "Marketing", href: "#" },
    { name: "Analytics", href: "#" },
    { name: "Commerce", href: "#" },
    { name: "Insights", href: "#" },
  ],
  support: [
    { name: "Pricing", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "Guides", href: "#" },
    { name: "API Status", href: "#" },
  ],
  company: [
    { name: "Shop", href: "/products" },
    { name: "Consulting", href: "/services/consulting" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/about/contact" },
    { name: "Request A Quote", href: "/ronatank/quote" },
  ],
  legal: [
    { name: "Claim", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
  payments: [
    {
      name: "Visa",
    },
    {
      name: "Mastercard",
    },
    {
      name: "Amex",
    },
    {
      name: "PayPal",
    },
  ],
}

const Footer = () => {
  return (
    <footer className="bg-blue-dark" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="block">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="flex flex-col items-center px-4">
                <h3 className="text-sm font-semibold text-gray-200 tracking-wider w-full text-center uppercase">
                  ISO 9001 Certified
                </h3>
                <div className="w-full h-full mt-4 max-h-32">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_CDN_BASE_URL}/ronatec/iso9001.png`}
                    width={593}
                    height={596}
                    className="w-full max-h-32 object-contain"
                    alt="ISO 9001 Certificate"
                  />
                </div>
              </div>
              <div className="mt-12 md:mt-0 px-4 flex flex-col items-center">
                <h3 className="text-sm font-semibold text-gray-200 tracking-wider w-full text-center uppercase">
                  ISO 17025 Certified
                </h3>
                <div className="w-full h-full mt-4 max-h-32">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_CDN_BASE_URL}/ronatec/iso17025.png`}
                    width={218}
                    height={300}
                    className="w-full max-h-32 object-contain"
                    alt="ISO 17025 Certificate"
                  />
                </div>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                  Quick Links
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <MenuLink
                        href={item.href}
                        className="text-base font-bold text-gray-100 hover:text-white"
                      >
                        {item.name}
                      </MenuLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0 text-gray-100 text-sm">
                <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                  Contact Info
                </h3>
                <div className="flex items-center pt-4">
                  <LocationMarkerIcon className="h-6 w-6 mr-2" />
                  <p className="text-gray-100 text-sm">
                    301 Mission Avenue #208, Oceanside, CA 92054
                  </p>
                </div>
                <div className="flex items-center pt-4">
                  <PhoneIcon className="h-4 w-4 mr-2" />
                  <p>
                    <a href="tel:+1-760-453-7367">(760) 453-7367</a>
                  </p>
                </div>
                <div className="flex items-center pt-4">
                  <PrinterIcon className="h-4 w-4 mr-2" />
                  <p>(760) 946-7862</p>
                </div>
                <div className="flex items-center pt-4">
                  <AtSymbolIcon className="h-4 w-4 mr-2" />
                  <a href="mailto:jim@ronatec.us">Email Inquiries</a>
                </div>
                <div className="flex items-center pt-4">
                  <GlobeAltIcon className="h-4 w-4 mr-2" />
                  <a href="https://ronatec.us">Website Link</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex space-x-6 md:order-2">
            {/* {navigation.payments.map(item => (
              <Icon
                name={`cc-${item.name.toLowerCase()}`}
                type="brands"
                className="h-12 w-12 text-gray-200 hover:text-gray-100"
                key={item.name}
                iconKey={`icon-${item.name}`}
              />
            ))} */}
          </div>
          <p className="text-base text-gray-200">
            &copy; {new Date().getFullYear()} Ronatec C2C, Inc. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
