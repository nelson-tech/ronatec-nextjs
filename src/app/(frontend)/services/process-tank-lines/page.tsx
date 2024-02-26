import Image from "@components/Image"
import VideoCard from "@components/VideoCard"
import { SEO_TITLE } from "@utils/constants"
import type { Image as ImageType, VideoLink } from "~payload-types"
import getPayloadClient from "~payload/payloadClient"

const ProcessTankLinesPage = async () => {
  const client = await getPayloadClient()
  const video = await client.findByID({
    collection: "videos",
    id: "64d5c8a7fe7929d14f26271a",
  })

  const placeholderImage = await client.findByID({
    collection: "images",
    id: "64d5c81afe7929d14f2626a9",
  })

  const heroImage = (await client.findByID({
    collection: "images",
    id: "653d53fbc381b5fb6cfe0420",
  })) as ImageType

  const enTankFront = (await client.findByID({
    collection: "images",
    id: "648b6981f7a26b0f50f4a262",
  })) as ImageType

  const anodizingTable = (await client.findByID({
    collection: "images",
    id: "64d7f09cd2744f6ba8773828",
  })) as ImageType

  const videoLink: VideoLink[0] = {
    title: "Process Line",
    provider: "direct",
    video,
    placeholderImage,
  }

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div
          className="relative h-96 bg-cover bg-bottom bg-no-repeat z-10 rounded-b-lg overflow-hidden"
          style={{ backgroundImage: `url(${heroImage.url})` }}
        >
          <div className=" bg-black/50 h-full w-full z-0" />
          <div
            className={` absolute p-8 text-white text-center inset-0 w-full py-4 z-10 h-full flex flex-col justify-center items-center`}
          >
            <h1 className={` text-4xl uppercase font-bold mb-8`}>
              Process Tank Lines
            </h1>
            <p className="text-lg px-8">
              Ronatec C2C, Inc. has a history of being at the forefront and
              introducing innovative concepts in the planning, construction, and
              installation of process tank systems.
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl px-8 mx-auto my-8">
        <div className="md:flex py-8">
          <div className="h-full flex-1 w-full md:w-96">
            <VideoCard videoLink={videoLink} cardStyle="w-full" />
          </div>

          <div className="text-gray-700 p-8 lg:space-y-4 prose max-w-none md:w-1/2">
            <h2>In-House Capabilities</h2>
            <p>
              Being among the select few vertically integrated firms within our
              sector, we are uniquely positioned to effectively manage nearly
              every facet of your project. We can showcase the following
              in-house manufacturing expertise and abilities:
            </p>
            <div className="lg:flex lg:gap-8">
              <ul
                className="bold-list list-none list-outside m-0 p-0 text-sm font-bold text-gray-600"
                role="list"
              >
                <li>Licensed, general contractor</li>
                <li>In-house engineering &amp;&nbsp;project management</li>
                <li>In-house steel and stainless steel fabrication</li>
                <li>ASME Code approved welding shop</li>
                <li>In-house sandblasting, painting, coating and linings</li>
                <li>
                  In-house plastic fabrication: PolyPro, polyethylene, PVC, CPVC
                  and PVDF
                </li>
                <li>In-house software development</li>
                <li>In-house mechanical and electrical assembly</li>
                <li>
                  Field construction (concrete, mechanical and electrical)
                </li>
                <li>Field installation using our own personnel</li>
                <li>UL 508A Panel Shop</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl px-8 mx-auto my-8 mb-8">
          <div className="md:flex">
            <div className="text-gray-700 p-4 lg:space-y-4 prose max-w-none md:w-1/2">
              <h2>Expert Engineering</h2>
              <p>
                <strong>Ronatec C2C, Inc.</strong> has a rich history of leading
                the way and introducing new ideas in the planning, construction,
                and setup of process tank systems. Whether you require a fully
                automated computer-controlled process that is turnkey and
                equipped with multiple hoists, a manual operation system, or
                standalone process tanks and elements, we are committed to
                surpassing your needs.{" "}
              </p>
              <p>
                Our extensive expertise extends to equipment designed for the
                following procedures:
              </p>
              <div className="lg:flex lg:gap-8">
                <ul className="mt-0 mb-0" role="list">
                  <li>Electrolytic Plating</li>
                  <li>Electroless Plating</li>
                  <li>Passivation</li>
                  <li>Electropolishing</li>
                  <li>Stripping</li>
                  <li>Phosphate Coatings</li>
                </ul>
                <ul className="mt-0" role="list">
                  <li>Etching</li>
                  <li>Anodizing</li>
                  <li>Chem Film &amp; Conversion Coatings</li>
                  <li>Black Oxide</li>
                  <li>Cleaning &amp;&nbsp;Surface Prep</li>
                </ul>
              </div>
            </div>
            <div className="h-full w-full md:w-1/2 flex justify-center items-center">
              <Image
                src={enTankFront.url ?? ""}
                alt={enTankFront.alt ?? ""}
                width={enTankFront.width ?? 0}
                height={enTankFront.height ?? 0}
                className="mt-4 rounded-lg shadow-xl mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl px-8 mx-auto my-8">
        <div className="md:flex">
          <div className="h-full flex-1 w-full md:w-96">
            <Image
              src={anodizingTable.url ?? ""}
              alt={anodizingTable.alt ?? ""}
              width={anodizingTable.width ?? 0}
              height={anodizingTable.height ?? 0}
              className="mt-4 rounded-lg shadow-xl mx-auto"
            />
          </div>
          <div className="text-gray-700 p-8 lg:space-y-4 prose max-w-none md:w-1/2">
            <h2>Profit Through Innovation</h2>
            <p>
              <strong>Ronatec C2C, Inc.</strong> has a rich history of leading
              the way and introducing new ideas in the planning, construction,
              and setup of process tank systems. Whether you require a fully
              automated computer-controlled process that is turnkey and equipped
              with multiple hoists, a manual operation system, or standalone
              process tanks and elements, we are committed to surpassing your
              needs.{" "}
            </p>
            <p>
              Our extensive expertise extends to equipment designed for the
              following procedures:
            </p>
            <div className="lg:flex lg:gap-8">
              <ul className="mt-0 mb-0" role="list">
                <li>Electrolytic Plating</li>
                <li>Electroless Plating</li>
                <li>Passivation</li>
                <li>Electropolishing</li>
                <li>Stripping</li>
                <li>Phosphate Coatings</li>
              </ul>
              <ul className="mt-0" role="list">
                <li>Etching</li>
                <li>Anodizing</li>
                <li>Chem Film &amp; Conversion Coatings</li>
                <li>Black Oxide</li>
                <li>Cleaning &amp;&nbsp;Surface Prep</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-accent text-white">
        <h2 className="text-2-xl md:text-4xl font-bold text-center py-24">
          <a
            href="/ronatank/quote"
            title="Request A Quote"
            className="px-8 py-4 my-8 bg-white text-accent-dark hover:text-highlight transition-all duration-300 rounded uppercase hover:shadow-lg"
          >
            Request A Quote
          </a>
        </h2>
      </div>
    </>
  )
}

export default ProcessTankLinesPage

export const metadata = {
  title: `Process Tank Lines ${SEO_TITLE}`,
  description: "Innovative process tank solutions by Ronatec C2C, Inc.",
  keywords: [
    "process tank lines",
    "management",
    "waste management",
    "Shop",
    "Ronatec",
    "Metal Finishing",
  ],
}
