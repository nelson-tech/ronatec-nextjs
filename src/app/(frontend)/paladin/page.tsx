import React from "react"
import "./style.css" // Add custom styles for colors, fonts, and layout.
import { CheckIcon } from "@heroicons/react/20/solid"

const Check = () => <CheckIcon className="inline w-6 h-6 mr-2 text-[#67e6a9]" />

const PromotionalPage = () => {
  return (
    <div className="p-5 text-center text-white promo-container bg-blue-main">
      <div className="w-fit mx-auto relative bg-[url('/paladin.webp')] bg-center aspect-video bg-cover rounded-lg p-12">
        <div
          style={styles.header}
          className="flex flex-col items-center justify-center h-full font-bold"
        >
          <h1 className="text-5xl text-outline lg:leading-7 lg:text-[5rem] text-accent shadow-lg drop-shadow-lg tracking-widest">
            PALADIN SHIELD
          </h1>
          <h2 className="text-xl lg:text-6xl lg:leading-10 text-outline text-accent lg:pt-16">
            THE FUTURE IS HERE!!!
          </h2>
        </div>
      </div>

      <div style={styles.content} className="mb-8">
        <h3 className="my-8 text-2xl font-bold">
          Ronatec introduces the Paladin Line of High Phos Electroless Nickel
        </h3>
        <ul className="w-fit mx-auto [&>li]:my-4 text-left">
          <li>
            <Check /> Salt Spray protection up to 7500 hours
          </li>
          <li>
            <Check /> Hardness equivalent to mid-phos baths
          </li>
          <li>
            <Check /> Maintains high phos characteristics, non-magnetic,
            amorphous coating, passes nitric acid test
          </li>
          <li>
            <Check /> One component make-up, self pH adjusting, high-speed
            deposition rate
          </li>
          <li>
            <Check /> Enhanced wear resistance
          </li>
          <li>
            <Check /> Tested & Proven Results - testing performed at a
            NADCAP-accredited materials testing lab
          </li>
        </ul>
      </div>

      <div
        // style={styles.comingSoon}
        className="pt-8 mt-16 border-t text-[#67e6a9]"
      >
        <p>
          <strong>COMING SOON!</strong>
          <br />
          The Paladin Shield for Mid-Phos EN - Up to 400 hours salt spray
          protection
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#2d2d5c",
    color: "#fff",
    textAlign: "center",
  },
  header: { marginBottom: "20px" },
  title: { fontSize: "3rem", color: "#ff007f" },
  subtitle: { fontSize: "1.5rem", color: "#fff" },
  shieldSection: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0",
  },
  shieldImage: { width: "300px", height: "auto" },
  content: {
    // margin: "20px 0", fontSize: "1.2rem"
  },
  featuresList: {
    listStyle: "none",
    textAlign: "left",
    // margin: "0 auto",
    // maxWidth: "600px",
  },
  comingSoon: { margin: "20px 0", fontSize: "1.3rem", color: "#00ff7f" },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderTop: "1px solid #fff",
  },
  footerInfo: { textAlign: "left" },
  link: { color: "#00f", textDecoration: "none" },
  qrCode: { width: "100px", height: "100px" },
}

export default PromotionalPage
