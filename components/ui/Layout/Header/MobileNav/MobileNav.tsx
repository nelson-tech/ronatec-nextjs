import MenuIcon from "@heroicons/react/outline/MenuIcon"
import SearchIcon from "@heroicons/react/outline/SearchIcon"

import useStore from "@lib/hooks/useStore"

// ####
// #### Component
// ####

const MobileNav = () => {
  const { setMobileMenuOpen, setSearchOpen } = useStore(state => ({
    setMobileMenuOpen: state.ui.setMobileMenuOpen,
    setSearchOpen: state.ui.setSearchOpen,
  }))
  return (
    <>
      <div className="flex-1 flex items-center lg:hidden">
        <button
          type="button"
          className="-ml-2 bg-white p-2 rounded-md text-gray-400"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only focus:text-white">Open menu</span>
          <MenuIcon className="h-6 w-6" aria-hidden="true" />
        </button>

        {/* Search */}
        <div
          className="ml-2 p-2 text-gray-400 hover:text-gray-500 cursor-pointer"
          onClick={() => setSearchOpen(true)}
        >
          <span className="sr-only">Search</span>
          <SearchIcon className="w-6 h-6" aria-hidden="true" />
        </div>
      </div>
    </>
  )
}

export default MobileNav
