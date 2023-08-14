import useStore from "@hooks/useStore"

import Modal from "@components/ui/Modal"
import SearchForm from "@components/SearchForm"

// ####
// #### Component
// ####

const SearchModal = () => {
  const { searchOpen, setSearchOpen } = useStore((state) => ({
    searchOpen: state.ui.searchOpen,
    setSearchOpen: state.ui.setSearchOpen,
  }))

  return (
    <>
      <Modal open={searchOpen} setOpen={setSearchOpen}>
        <SearchForm setModalClosed={setSearchOpen} />
      </Modal>
    </>
  )
}

export default SearchModal
