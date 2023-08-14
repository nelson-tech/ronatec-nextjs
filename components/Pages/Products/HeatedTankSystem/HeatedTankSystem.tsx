import Image from "@components/Image"

import "./style.css"

// ####
// #### Component
// ####

const HeatedTankSystemComponent = () => {
  return (
    <>
      <div className="max-w-7xl p-8 mx-auto">
        <div className="md:flex pb-4">
          <div className="md:flex md:flex-col md:w-2/3">
            <div className="text-sm text-gray-500">
              <p>
                Our system evaporates water from process solutions and waste
                waters under atmospheric conditions. By heating the solution
                prior to pumping it into the evaporator, the highest evaporation
                rate can be achieved .
              </p>
              <p>
                This is accomplished by using our heated tank with either an
                electric heater, a gas-fired burner, or a steam coil. The
                evaporative tank has no weld seams for a leak-free operation and
                is molded out of polyethylene. With thousands of these tanks
                being used, the evaporator has proven to be the leader in
                atmospheric evaporation of water.
              </p>
            </div>
            <div className="mt-4">
              <h3 className="font-bold text-gray-700 py-2">Systems include:</h3>
              <ul className="list-disc ml-8 text-gray-500 text-sm space-y-2">
                <li>
                  Stainless steel heated tank and fire tube (carbon steel and
                  polyethylene are also available)
                </li>
                <li>Electric heater, gas fired burner, or steam coil</li>
                <li>
                  Control panel with over temperature protection, temperature
                  control, and level controls for automatic operation
                </li>
                <li>
                  Stainless steel or CPVC centrifugal pump to feed evaporator
                </li>
                <li>Skid mounting with wiring and piping pre-installed</li>
                <li>An evaporative tank</li>
              </ul>
            </div>
          </div>
          <div className="md:w-1/3 pl-4 pt-8">
            <div>
              <Image
                src="https://cdn.ronatec.us/ronatec/20220215004455/Heated-Tank.jpg"
                alt="Heated Tank"
                height={284}
                width={244}
              />
            </div>
          </div>
        </div>

        <div className="pt-4 text-gray-500 border-t">
          <div className="styled-table">
            <table width="100%">
              <thead>
                <tr>
                  <th align="left">Heated Tank Models</th>
                  <th align="left">Dimensions</th>
                  <th align="left">Evaporation *</th>
                  <th align="left">Heater BTU</th>
                  <th align="left">ET Companion</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td align="left">ET-III-W-1-MINI.-55-40**</td>
                  <td align="left">4 &apos;x 8 &apos;x 9 &apos;</td>
                  <td align="center">40 GPH</td>
                  <td align="right">550,000</td>
                  <td align="center">No</td>
                </tr>
                <tr>
                  <td align="left">ET-III-W-1-MINI.-55-40-C**</td>
                  <td align="left">
                    4 &apos;6&quot; x 9 &apos;6&quot; x 9 &apos; 6&quot;
                  </td>
                  <td align="center">40 GPH</td>
                  <td align="right">550,000</td>
                  <td align="center">Yes</td>
                </tr>
                <tr>
                  <td align="left">ET-III-W-1-HT-55-40</td>
                  <td align="left">7 &apos; x 9 &apos; x 13 &apos;9&quot;</td>
                  <td align="center">40 GPH</td>
                  <td align="right">550,000</td>
                  <td align="center">No</td>
                </tr>
                <tr>
                  <td align="left">ET-III-W-1-HT-55-40-C</td>
                  <td align="left">7 &apos; x 9 &apos; x 13 &apos;9&quot;</td>
                  <td align="center">40 GPH</td>
                  <td align="right">550,000</td>
                  <td align="center">Yes</td>
                </tr>
                <tr>
                  <td align="left">ET-III-W-2-HT-1.0-80</td>
                  <td align="left">
                    7 &apos; x 1 0 &apos; x 13 &apos; 9&quot;
                  </td>
                  <td align="center">80 GPH</td>
                  <td align="right">1,000,000</td>
                  <td align="center">No</td>
                </tr>
                <tr>
                  <td align="left">ET-III-W-2-HT-1.0-80-C</td>
                  <td align="left">
                    7 &apos; x 1 0 &apos; x 13 &apos; 9&quot;
                  </td>
                  <td align="center">80 GPH</td>
                  <td align="right">1,000,000</td>
                  <td align="center">Yes</td>
                </tr>
                <tr>
                  <td align="left">ET-III-W-3-HT-2.0-120</td>
                  <td align="left">8 &apos; x 15 &apos; x 13 &apos; 9&quot;</td>
                  <td align="center">120 GPH</td>
                  <td align="right">2,000,000</td>
                  <td align="center">No</td>
                </tr>
                <tr>
                  <td align="left">ET-III-W-3-HT-2.0-120-C</td>
                  <td align="left">8 &apos; x 15 &apos; x 13 &apos;9&quot;</td>
                  <td align="center">120 GPH</td>
                  <td align="right">2,000,000</td>
                  <td align="center">Yes</td>
                </tr>
                <tr>
                  <td align="left">ET-III-W-4-HT-2.5-160</td>
                  <td align="left">8 &apos; x 20 &apos; x 13 &apos; 9&quot;</td>
                  <td align="center">160 GPH</td>
                  <td align="right">2,500,000</td>
                  <td align="center">No</td>
                </tr>
                <tr>
                  <td align="left">ET-III-W-4-HT-2.5-160-C</td>
                  <td align="left">8 &apos; x 20 &apos; x 13 &apos; 9&quot;</td>
                  <td align="center">160 GPH</td>
                  <td align="right">2,500,000</td>
                  <td align="center">Yes</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-sm text-gray-400 pb-4">
            <p>
              * The above evaporation rates are based on water. Evaporation
              rates will vary as the solution thickens and has less water
              content.
            </p>
            <p>** MINI series does not include platform and stand.</p>
          </div>
        </div>
        <div className="py-4 border-t">
          <div className="md:flex">
            <div className="md:w-1/2">
              <h3 className="font-bold text-gray-700 py-2">
                Optional Accessories:
              </h3>
              <ul className="list-disc ml-8 text-sm text-gray-500 space-y-2">
                <li>
                  Additional condenser for recovery of the evaporated water for
                  reuse
                </li>
                <li>Insulated heated tank</li>
                <li>Filter press for continual solids removal</li>
                <li>Storage tanks</li>
                <li>Pump stations</li>
                <li>
                  Cooling tower for the additional condenser &apos;s cooling
                  water
                </li>
                <li>
                  Above dimensions can be altered to fit special installation
                  requirements
                </li>
                <li>
                  Titanium electric heaters or De-Rated Teflon coated electric
                  heaters for extremely aggressive solutions
                </li>
              </ul>
            </div>
            <div className="relative m-8 md:w-1/2">
              <Image
                src="https://cdn.ronatec.us/ronatec/20220215005312/tank3.gif"
                alt="Tanks"
                width={368}
                height={280}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeatedTankSystemComponent
