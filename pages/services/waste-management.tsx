import withUrql from "@api/urql/hoc"

import Layout from "@components/ui/Layout"
import PageTitle from "@components/PageTitle"

const WasteManagement = () => {
  return (
    <>
      <Layout>
        <PageTitle
          title="Waste Management"
          description="Ronatec C2C is a specialty chemical and service solutions provider
      for water treatment, waste treatment, and process automation and
      control."
        />

        <div className="max-w-7xl p-8">
          <div className="text-gray-500">
            <div className="pb-4">
              Ronatec C2C is a specialty chemical and service solutions provider
              for water treatment, waste treatment, and process automation and
              control. FCT Water is committed to anticipating and fulfilling our
              customer&apos;s needs through appropriate product and service
              solutions. Contact a Ronatec representative today to discuss how
              we can provide the solutions you need to more efficiently manage
              your operations.
            </div>

            <div className="space-y-2 border-t pb-4">
              <h3 className="font-bold pt-2">Metal Finishing</h3>
              <p>
                Ronatec can help you meet your discharge limits for zinc, chrome
                or other heavy metals with our line of precipitants, coagulants,
                flocculants, and defoamers. We are a leader in precipitant and
                coagulant formulation chemistry with over 25 different
                formulations designed to handle a wide range of chelated waste
                stream challenges.
              </p>
              <ul className="list-disc ml-8">
                <li>Precipitants</li>
                <li>Coagulants</li>
                <li>Flocculants</li>
                <li>Defoamers</li>
                <li>Bentonite Clays</li>
                <li>Operator Training</li>
                <li>Control and Automation</li>
              </ul>
            </div>

            <div className="space-y-2 border-t pb-4">
              <h3 className="font-bold pt-2">HVAC</h3>
              <p>
                Heating boilers, combustion turbines, chillers, cooling towers,
                evaporators; these have become sophisticated integrated systems
                requiring specific treatment chemicals and close attention. At
                Ronatec we provide custom specialty chemicals for all your
                applications. We can also provide and manage your industrial
                chemical needs and inventories. In addition we can design and
                install instrumentation to monitor and control all of these
                systems and manage your chemical inventories and all of this
                data can be provided to you, real time via dedicated web access.
                From design to delivery, consultation to chemicals, we provide
                solutions.
              </p>
              <ul className="list-disc ml-8">
                <li>Oxygen Scavengers</li>
                <li>Chiller Chemicals</li>
                <li>Boiler Treatment</li>
                <li>Condensate Treatment</li>
                <li>RO/EDI/Demineralizer Products</li>
                <li>Waste Water Treatment</li>
                <li>Remote Analyzer Data and Alarm Monitoring</li>
                <li>Remote Inventory Management and Control</li>
                <li>Operator Training</li>
              </ul>
            </div>

            <div className="space-y-2 border-t pb-4">
              <h3 className="font-bold pt-2">Oil &amp; Gas</h3>
              <p>
                The oil and gas industry expects exceptional service and
                products. Ronatec takes pride in being the best at what we do.
                We provide custom specialty chemicals, industrial chemicals,
                chemical inventory management, remote system monitoring, remote
                control systems, remote inventory monitoring and web based
                access to this vital information.
              </p>
              <p>
                We can provide products and equipment for your down hole
                corrosion, antiscalant, and biocide programs. We can also
                provide hydrogen sulfide control products, flow enhancers and
                pre-blended well pills.
              </p>
              <ul className="list-disc ml-8">
                <li>Oxygen Scavengers</li>
                <li>Condensate Treatment</li>
                <li>Breakers and Reverse Breakers</li>
                <li>Waste Water Treatment</li>
                <li>Remote Analyzer Data and Alarm Monitoring</li>
                <li>Remote Inventory Management and Control</li>
                <li>Operator Training</li>
              </ul>
            </div>

            <div className="space-y-2 border-t pb-4">
              <h3 className="font-bold pt-2">
                Printed Circuit Board Fabrication
              </h3>
              <p>
                Manufacturing printed circuit boards generates a challenging mix
                of chelated waste streams. Ronatec can help you in managing the
                removal of heavy metals such as copper, tin, and lead all while
                reducing sludge production and efffectively meeting local
                discharge limits. Contact your local representative for a no
                charge evaluation.
              </p>
              <ul className="list-disc ml-8">
                <li>Precipitants</li>
                <li>Coagulants</li>
                <li>Flocculants</li>
                <li>Defoamers</li>
                <li>Bentonite Clays</li>
                <li>Operator Training</li>
                <li>Control and Automation</li>
              </ul>
            </div>

            <div className="space-y-2 border-t pb-4">
              <h3 className="font-bold pt-2">Bio Fuels</h3>
              <p>
                The electric utility industry is facing challenging and exciting
                times. New generation platforms, deregulation, tighter air and
                water regulations all demand close attention. As a specialty
                chemical company with extensive experience in power plant
                chemistry and chemistry systems, Ronatec can help you meet these
                challenges.
              </p>
              <p>
                Whether you operate a single unit or a network; whether you
                systems are coal, gas or oil fired or nuclear, we can assist you
                with your chemistry related needs. State of the art pretreatment
                systems or evaporators, waste water to sewer or zero discharge,
                water cooled, air cooled, once through, or cooling towers,
                impound lakes or evaporative ponds. We can provide custom
                chemistries, analytical services, instrument and sample panel
                upgrades, remote monitoring and control over chemistry
                equipment. If you need it we have it or we can build it.
              </p>
              <ul className="list-disc ml-8">
                <li>Design Engineering</li>
                <li>Oxygen Scavengers</li>
                <li>Boiler Treatments</li>
                <li>Condensate Treatment</li>
                <li>Waste Water Treatment</li>
                <li>Process Corrosion Inhibitors</li>
                <li>Remote Analyzer Data and Alarm Monitoring</li>
                <li>Remote Inventory Management and Control</li>
                <li>Operator Training</li>
              </ul>
            </div>

            <div className="space-y-2 border-t pb-4">
              <h3 className="font-bold pt-2">Power</h3>
              <p>
                The electric utility industry is facing challenging and exciting
                times. New generation platforms, deregulation, tighter air and
                water regulations all demand close attention. As a specialty
                chemical company with extensive experience in power plant
                chemistry and chemistry systems, Ronatec can help you meet these
                challenges.
              </p>
              <p>
                Whether you operate a single unit or a network; whether you
                systems are coal, gas or oil fired or nuclear, we can assist you
                with your chemistry related needs. State of the art pretreatment
                systems or evaporators, waste water to sewer or zero discharge,
                water cooled, air cooled, once through, or cooling towers,
                impound lakes or evaporative ponds. We can provide custom
                chemistries, analytical services, instrument and sample panel
                upgrades, remote monitoring and control over chemistry
                equipment. If you need it we have it or we can build it.
              </p>
              <ul className="list-disc ml-8">
                <li>Boiler Treatment</li>
                <li>Oxygen Scavengers</li>
                <li>Condensate Treatment</li>
                <li>Closed System Products</li>
                <li>Waste Water Treatment</li>
                <li>Dust Control Systems and Products</li>
                <li>Sample Panel Upgrades</li>
                <li>Remote Analyzer Data and Alarm Monitoring</li>
                <li>Remote Inventory Management and Control</li>
                <li>Operator Training</li>
              </ul>
            </div>

            {/* <div className="space-y-2 border-t pb-4">
            <h3 className="font-bold pt-2">Customer Waste Treatment Systems</h3>
          </div> */}
          </div>
        </div>
      </Layout>
    </>
  )
}

// ####
// #### API
// ####

export default withUrql(WasteManagement)
