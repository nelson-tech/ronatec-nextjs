import withUrql from "@api/urql/hoc"

import Layout from "@components/ui/Layout"
import PageTitle from "@components/PageTitle"

const WasteRemoval = () => {
  return (
    <>
      <Layout>
        <PageTitle
          title="Waste Removal &amp; Disposal"
          description="Ronatec C2C is a full service organization dedicated to limiting
      the issues associated with special waste removal and disposal."
        />

        <div className="max-w-7xl p-8 mx-auto">
          <div className="text-gray-500">
            <div className="pb-4 space-y-4">
              <p>
                Ronatec C2C is a full service organization dedicated to limiting
                the issues associated with special waste removal and disposal.
                Ronatec is a single source waste removal, transportation &amp;
                disposal contractor with the ability to provide turnkey services
                while performing environmental projects.
              </p>
              <p>
                By offering fresh chemistry and its removal Ronatec is a
                one-stop shop, providing our customers with the most ideal
                situations. We realize that delivering consistent, timely
                services translates into higher profits for our customers.
                Removing the waste products from your site is only a small part
                of the process. Our team will provide a complete project outline
                long making sure all of your needs are met, long before our
                trucks reach your site.
              </p>
              <p>
                24 hour a day service is available for any emergencies or
                problems that may arise!
              </p>
            </div>
            <div className="space-y-2 border-t pb-4">
              <h3 className="font-bold py-2">Services Offered</h3>
              <p className="font-bold text-sm">
                Hazardous Waste Analysis, Transportation &amp; Disposal
              </p>
              <ul className="list-disc ml-8">
                <li>
                  Full analysis of materials, provide manifest paperwork, and
                  dispose your materials in a proper and safe manner.
                </li>
                <li>
                  Drum, Tote or Tanker Truck hauling is available for your
                  convenience.
                </li>
              </ul>
              <p className="font-bold text-sm">Cleaning</p>
              <ul className="list-disc ml-8">
                <li>Tanks Cleaning</li>
                <li>High Pressure Water Blasting</li>
              </ul>
              <p className="font-bold text-sm">Consulting</p>
              <ul className="list-disc ml-8">
                <li>Environmental Training</li>
                <li>Plant Clean up</li>
              </ul>
              <p className="font-bold text-sm">Emergency Services</p>
              <ul className="list-disc ml-8">
                <li>24 hour spill/emergency cleanup on call!</li>
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

// ####
// #### API
// ####

export default withUrql(WasteRemoval)
