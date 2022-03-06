import Image from "next/image"
import styled from "@emotion/styled"

import PageTitle from "@components/PageTitle"

const StyledTable = styled.div`
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color),
    0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  overflow-x: auto;
  border-bottom-width: 1px;
  --tw-border-opacity: 1;
  border-color: rgb(229 231 235 / var(--tw-border-opacity));
  @media (min-width: 640px) {
    border-radius: 0.5rem /* 8px */;
  }
  margin-left: -2.5rem /* -40px */;
  margin-right: -2.5rem /* -40px */;
  margin-top: 1.5rem /* 24px */;
  margin-bottom: 1.5rem /* 24px */;
  padding: 2rem;

  table {
    min-width: 100%;
    > :not([hidden]) ~ :not([hidden]) {
      --tw-divide-y-reverse: 0;
      border-top-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));
      border-bottom-width: calc(1px * var(--tw-divide-y-reverse));
      --tw-divide-opacity: 1;
      border-color: rgb(229 231 235 / var(--tw-divide-opacity));
    }

    thead {
      --tw-bg-opacity: 1;
      background-color: rgb(249 250 251 / var(--tw-bg-opacity));
      th {
        padding-left: 1.5rem /* 24px */;
        padding-right: 1.5rem /* 24px */;
        padding-top: 0.75rem /* 12px */;
        padding-bottom: 0.75rem /* 12px */;
        font-size: 0.75rem /* 12px */;
        line-height: 1rem /* 16px */;
        text-align: left;
        font-weight: 500;
        --tw-text-opacity: 1;
        color: rgb(107 114 128 / var(--tw-text-opacity));
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
    }

    tbody {
      --tw-bg-opacity: 1;
      background-color: rgb(255 255 255 / var(--tw-bg-opacity));
      --tw-divide-y-reverse: 0;
      > :not([hidden]) ~ :not([hidden]) {
        border-top-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));
        border-bottom-width: calc(1px * var(--tw-divide-y-reverse));
        --tw-divide-opacity: 1;
        border-color: rgb(229 231 235 / var(--tw-divide-opacity));
      }

      td {
        padding-left: 1.5rem /* 24px */;
        padding-right: 1.5rem /* 24px */;
        padding-top: 1rem /* 16px */;
        padding-bottom: 1rem /* 16px */;
        white-space: nowrap;
        font-size: 0.875rem /* 14px */;
        line-height: 1.25rem /* 20px */;
        --tw-text-opacity: 1;
        color: rgb(107 114 128 / var(--tw-text-opacity));
      }
    }
  }
`

const HeatedTankSystem = () => {
  return (
    <>
      <PageTitle
        title="Heated Tank System"
        description="Our system evaporates water from process solutions and waste
      waters under atmospheric conditions."
      />

      <div className="max-w-7xl p-8">
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
          <StyledTable>
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
          </StyledTable>
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

export default HeatedTankSystem
