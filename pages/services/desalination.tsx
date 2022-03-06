import PageTitle from "@components/PageTitle"

const Desalination = () => {
  return (
    <>
      <PageTitle
        title="Desalination"
        description="Desalination, desalinization, or desalinisation refers to any of
      several processes that remove excess salt and other minerals from
      water."
      />

      <div className="max-w-7xl p-8">
        <div className="text-gray-500">
          <div className="pb-4 space-y-4">
            <p>
              Desalination, desalinization, or desalinisation refers to any of
              several processes that remove excess salt and other minerals from
              water.
            </p>
          </div>

          <div className="space-y-2 border-t pb-4">
            <h3 className="font-bold py-2">Viable Methods Of Desalination</h3>
            <ul className="list-disc ml-8 text-sm">
              <li>
                <strong>Distillation:</strong> Boiling water and condensing the
                vapor, leaving behind the unwanted dissolved solids.
              </li>
              <li>
                <strong>Reverse Osmosis:</strong> Pressurizing sea water up
                against a special membrane that allows only water to pass
                through, trapping the unwanted ions on the other side of the
                membrane.
              </li>
              <li>
                <strong>Capacitive Deionization:</strong> Passing the water
                between two oppositely charged capacitor plates which draw and
                hold ions, allowing the clean water to pass through.
              </li>
            </ul>
          </div>

          <div className="space-y-2 border-t pb-4">
            <h3 className="font-bold py-2">
              Ronatec Exclusively Uses The RDI Method
            </h3>
            <ul className="list-disc ml-8 text-sm">
              <li>3rd generation CDI system and design.</li>
              <li>Patented carbon electrodes.</li>
              <li>
                Version 3.0 formatting (reduced electrical resistance, ease of
                manufacturing, increased capacity). Patent pending.
              </li>
              <li>Energy recovery module. Patent pending.</li>
              <li>Innovative TDS detectors. Patent pending.</li>
              <li>Superior system design and construction.</li>
              <li>Low capital and maintenance costs.</li>
            </ul>
          </div>

          <div className="space-y-2 border-t pb-4">
            <h3 className="font-bold py-2">RDI Desalinization System</h3>
            <ul className="list-disc ml-8 text-sm">
              <li>Pump (if necessary)</li>
              <li>Standard pre-filtration (if necessary)</li>
              <li>Multiple stage RDI Process Cylinders</li>
              <li>Process tanks</li>
              <li>Energy Recovery Module</li>
              <li>Control cabinet</li>
            </ul>
          </div>

          <div className="space-y-2 border-t pb-4">
            <h3 className="font-bold py-2">Advantages of RDITM System</h3>
            <ul className="list-disc ml-8 text-sm">
              <li>
                <strong>Capital Costs</strong>: 42% less than distillation, 10 -
                20% less than RO.
              </li>
              <li>
                <strong>Energy Usage</strong>: 10 - 80% less than RO and 50 -
                90% less than distillation.
              </li>
              <li>
                <strong>Chemical Usage</strong>: No chemicals are needed to
                regularly run system eliminating waste disposal. All cleaning is
                done via generation cycles and clean water produced by system.
              </li>
              <li>
                <strong>Operating Costs</strong>: Significantly below
                alternatives.
              </li>
            </ul>
          </div>

          <div className="space-y-2 border-t pb-4">
            <h3 className="font-bold py-2">History Of Technology</h3>
            <ul className="list-disc ml-8 text-sm">
              <li>
                Research &amp; Development was funded by the US Department of
                Defense in order to develop an alternative technology to RO.
              </li>
              <li>
                <a
                  className="underline text-blue-main hover:text-green-main"
                  href="ftp://ftp.rta.nato.int/PubFullText/RTO/MP/RTO-MP-HFM-086/MP-HFM-086-11.pdf"
                >
                  2 Pilot Units built and delivered to Army
                </a>
              </li>
              <li>
                <strong>RDI</strong> is the 3rd generation CDI system cylinder
                design by Atlantis Technologies.
              </li>
              <li>
                <a
                  className="underline text-blue-main hover:text-green-main"
                  href="http://www.spectrum.ieee.org/apr08/6098"
                >
                  Australian government implementing a version of the
                  technology.
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-white border-t pb-4">
            <h3 className="font-bold py-2">RDI Desalination Team</h3>
            <div className="max-w-7xl mx-auto divide-y divide-gray-200 lg:py-8 lg:flex lg:justify-center lg:divide-y-0 lg:divide-x">
              <div className="py-8 lg:py-0 lg:w-1/3 lg:flex-none">
                <div className="max-w-xs mx-auto px-4 flex items-center lg:max-w-none lg:px-8">
                  <div className="ml-4 flex-auto flex flex-col">
                    <h3 className="font-medium text-gray-900">
                      Ronatec C2C, Inc.
                    </h3>
                    <p className="text-sm text-gray-500">
                      General contractor, and supplier of chemicals and filter
                      equipment to the plating and bottle filling industry.
                    </p>
                  </div>
                </div>
              </div>
              <div className="py-8 lg:py-0 lg:w-1/3 lg:flex-none">
                <div className="max-w-xs mx-auto px-4 flex items-center lg:max-w-none lg:px-8">
                  <div className="ml-4 flex-auto flex flex-col">
                    <h3 className="font-medium text-gray-900">
                      Atlantis Technologies
                    </h3>
                    <p className="text-sm text-gray-500">
                      Chief designer, patent holder, project manager, installer.
                    </p>
                  </div>
                </div>
              </div>
              <div className="py-8 lg:py-0 lg:w-1/3 lg:flex-none">
                <div className="max-w-xs mx-auto px-4 flex items-center lg:max-w-none lg:px-8">
                  <div className="ml-4 flex-auto flex flex-col">
                    <h3 className="font-medium text-gray-900">
                      Nortek Automation
                    </h3>
                    <p className="text-sm text-gray-500">
                      World class system integrator, final assembler of system.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Desalination
