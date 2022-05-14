import dynamic from "next/dynamic"
import UserIcon from "@heroicons/react/outline/UserIcon"
import TranslateIcon from "@heroicons/react/outline/TranslateIcon"
import SearchIcon from "@heroicons/react/outline/SearchIcon"

import CartButton from "./CartButton"

// ####
// #### Dynamic Imports
// ####

const MenuLoaderButton = () => (
  <div className="hidden lg:block relative lg:flex-shrink-0 h-full">
    <div className="h-full">
      <button className="font-bold text-sm rounded-md py-2 outline-none text-gray-400 hover:text-gray-500">
        <span className="sr-only">Open user menu</span>
        <UserIcon className="h-6 w-6" />
      </button>
    </div>
  </div>
)

const LanguageLoaderButton = () => (
  <div className="block relative lg:flex-shrink-0 h-full mr-4 lg:mr-8">
    <div className="h-full">
      <button className="font-bold text-sm rounded-md py-2 outline-none text-white">
        <span className="sr-only">Open user menu</span>
        <TranslateIcon className="h-6 w-6" />
      </button>
    </div>
  </div>
)

const SearchLoaderButton = () => (
  <>
    <div className="hidden lg:flex -m-2 p-2 text-gray-400 hover:text-gray-500 cursor-pointer">
      <span className="sr-only">Search</span>
      <SearchIcon className="w-6 h-6" aria-hidden="true" />
    </div>
  </>
)

const ProfileMenu = dynamic(() => import("./ProfileMenu"), {
  loading: () => <MenuLoaderButton />,
})

const SearchButton = dynamic(() => import("./SearchButton"), {
  loading: () => <SearchLoaderButton />,
})

// ####
// #### Component
// ####

const UserNav = () => {
  return (
    <>
      <div className="flex-1 flex items-center justify-end">
        {/* <a href="#" className="hidden text-sm font-medium text-white lg:block">
          Search
        </a> */}

        <div className="flex items-center lg:ml-8">
          <SearchButton />

          <ProfileMenu />
          {/* <LoaderButton /> */}
          {/* Cart */}
          <div className="ml-4 flow-root lg:ml-8">
            <CartButton />
          </div>
        </div>
      </div>
    </>
  )
}

export default UserNav
