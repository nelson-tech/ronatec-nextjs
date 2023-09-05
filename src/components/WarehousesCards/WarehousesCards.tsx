"use client"

import Link from "@components/Link"
import { Disclosure, Transition } from "@headlessui/react"
import { ChevronUpIcon } from "@heroicons/react/20/solid"

const WarehousesCards = () => {
  return (
    <div className="mx-auto max-w-7xl relative bg-white pb-16 py-8 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 text-sm h-full">
        <div
          className={`flow-root bg-gray-50 rounded p-6 md:pt-0 h-full text-center`}
        >
          <div className="flex flex-col justify-center h-full text-base text-gray-500">
            <p className={"pt-2"}>
              Ronatec actively stocks and distributes its products in locations
              around the world with a goal of 48-hour delivery times from PO
              placement for our valued customers and clients.
            </p>
            <p className="pt-4">
              View the locations <span className="md:hidden">below</span>
              <span className="hidden md:inline">to the right</span> or visit
              the{" "}
              <Link
                href="/about/warehouses"
                className="text-accent hover:text-highlight transition-all"
              >
                warehouses page
              </Link>{" "}
              for a list of our warehouse locations.
            </p>
          </div>
        </div>
        <div
          className={`flow-root bg-gray-50 rounded px-6 pb-8 md:pt-0 h-full`}
        >
          <div className="mt-5">
            <div>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      className={`flex w-full justify-between hover:font-bold transition-all${
                        open ? " font-bold" : ""
                      } py-4`}
                    >
                      <span className="">USA</span>{" "}
                      <ChevronUpIcon
                        className={`${
                          open ? "rotate-180 transform" : ""
                        } h-5 w-5 text-gray-500 transition-all`}
                      />
                    </Disclosure.Button>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel>
                        <p className={"text-gray-500 "}>
                          <ul>
                            {[
                              "Los Angeles CA",
                              "Phoenix AZ",
                              "Denver CO",
                              "Portland OR",
                              "San Diego CA",
                              "Lenoir NC",
                              "Indianapolis IN",
                              "Dallas TX",
                              "Tampa FL",
                            ].map((location) => (
                              <li key={location}>{location}</li>
                            ))}
                          </ul>
                        </p>
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>

              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      className={`flex w-full justify-between hover:font-bold transition-all${
                        open ? " font-bold" : ""
                      } py-4`}
                    >
                      <span className="">Mexico</span>{" "}
                      <ChevronUpIcon
                        className={`${
                          open ? "rotate-180 transform" : ""
                        } h-5 w-5 text-gray-500 transition-all`}
                      />
                    </Disclosure.Button>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel>
                        <p className={"text-gray-500 "}>
                          <ul>
                            {["Tijuana MX", "Hermosillo MX"].map((location) => (
                              <li key={location}>{location}</li>
                            ))}
                          </ul>
                        </p>
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>

              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      className={`flex w-full justify-between hover:font-bold transition-all${
                        open ? " font-bold" : ""
                      } py-4`}
                    >
                      <span className="">Canada</span>{" "}
                      <ChevronUpIcon
                        className={`${
                          open ? "rotate-180 transform" : ""
                        } h-5 w-5 text-gray-500 transition-all`}
                      />
                    </Disclosure.Button>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel>
                        <p className={"text-gray-500 "}>
                          <ul>
                            {["Edmonton AL"].map((location) => (
                              <li key={location}>{location}</li>
                            ))}
                          </ul>
                        </p>
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>

              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      className={`flex w-full justify-between hover:font-bold transition-all${
                        open ? " font-bold" : ""
                      } py-4`}
                    >
                      <span className="">Asia</span>{" "}
                      <ChevronUpIcon
                        className={`${
                          open ? "rotate-180 transform" : ""
                        } h-5 w-5 text-gray-500 transition-all`}
                      />
                    </Disclosure.Button>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel>
                        <p className={"text-gray-500 "}>
                          <ul>
                            {["Taipei TW", "Bangkok TL"].map((location) => (
                              <li key={location}>{location}</li>
                            ))}
                          </ul>
                        </p>
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WarehousesCards
