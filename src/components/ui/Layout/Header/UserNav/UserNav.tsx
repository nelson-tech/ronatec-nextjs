import CartButton from "./CartButton"
import SearchButton from "./SearchButton"
import ProfileMenu from "./ProfileMenu"

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
          <div className="ml-4 flow-root lg:ml-8">
            <CartButton />
          </div>
        </div>
      </div>
    </>
  )
}

export default UserNav
