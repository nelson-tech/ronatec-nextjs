import VideoCard from "@components/VideoCard"
import tw from "twin.macro"

const CarbonateRemovalSystem = () => {
  const listStyle: string = "text-gray-300 text-sm pr-16"
  return (
    <>
      <div className="w-screen mx-auto text-2xl bg-green-main text-white text-center py-2">
        <h2>Ronatec Carbonate Removal System</h2>
      </div>
      <div className="max-w-7xl px-8 lg:px-16 my-8">
        <div className="text-gray-500">
          The Ronatec DeCarb is the premier domestically designed and
          manufactured sodium carbonate removal system. By increasing process
          capability, the DeCarb allows for a more consistent operation of the
          plating bath as well as eliminating solution loss and the resultant
          waste treatment fees. By maintaining a more consistent bath efficiency
          by steady stating the amount of sodium carbonate in solution, current
          density variations during the plating process will be reduced. Can
          work on any solution in which carbonates need to be removed.
        </div>
      </div>
      <div className="w-screen bg-gray-800">
        <div className="max-w-7xl px-16 py-8">
          <div className="pb-4">
            <h2 className="text-xl font-extrabold text-gray-100">Features</h2>
          </div>
          <div>
            <ul className="list-disc ml-8 text-xl space-y-4 text-green-main md:columns-2">
              <li>
                <span className={listStyle}>
                  Variable capacity as specified by end user. Can accommodate
                  all footprint requirements.
                </span>
              </li>
              <li>
                <span className={listStyle}>
                  This unit has an ACTUAL CHILLER with additional capacity, so
                  you can cool other items near the unit if you would like.
                  &quot;Low End&quot; Refrigeration units are used on
                  competitive products. They struggle in the heat.
                </span>
              </li>
              <li>
                <span className={listStyle}>Unit is mobile.</span>
              </li>
              <li>
                <span className={listStyle}>
                  Level control comes standard: high level control in the chill
                  tank and a low level/high level in the catch tank.
                </span>
              </li>
              <li>
                <span className={listStyle}>
                  Secondary containment is built in
                </span>
              </li>
              <li>
                <span className={listStyle}>
                  Available in 480V or 230V power. The DeCarb is domestically
                  made so there are no power issues due to unit being
                  manufactured overseas.
                </span>
              </li>
              <li>
                <span className={listStyle}>Rust proof design</span>
              </li>
              <li>
                <span className={listStyle}>
                  Designed to be plumbed for automatic unit fill and tank return
                </span>
              </li>
              <li>
                <span className={listStyle}>
                  Handles all sodium carbonate bearing plating solutions
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-blue-dark">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Pricing starts at just $15,000!
            </h2>
          </div>
          <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto">
            <div className="flex flex-col">
              <div className="mt-2 text-lg leading-6 font-medium text-gray-400">
                That&apos;s
              </div>
              <div className="text-5xl font-extrabold text-white">50%</div>
              <div className="mt-2 text-lg leading-6 font-medium text-gray-400">
                less than our competition!
              </div>
            </div>
          </dl>
        </div>
      </div>
      <div className="max-w-7xl px-16">
        <div className="my-8">
          <h2 className="text-xl font-extrabold text-gray-800 pb-8">
            See it in action:
          </h2>

          <VideoCard
            videoLink={{
              title: "",
              videoId: "tb54hMJb1jE",
              videoUrl: "https://youtu.be/tb54hMJb1jE",
            }}
            cardStyle={tw`pb-12 px-5 w-full md:w-4/5 lg:w-2/3 mx-auto`}
            light
          />
        </div>
      </div>
    </>
  )
}

export default CarbonateRemovalSystem
