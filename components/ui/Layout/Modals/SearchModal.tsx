import useStore from "@lib/hooks/useStore"

import Modal from "@components/ui/Modal"
import SearchForm from "@components/SearchForm"
import shallow from "zustand/shallow"

const SearchModal = () => {
  const { searchOpen, setSearchOpen } = useStore(
    state => ({
      searchOpen: state.ui.searchOpen,
      setSearchOpen: state.ui.setSearchOpen,
    }),
    shallow,
  )

  return (
    <>
      <Modal open={searchOpen} setOpen={setSearchOpen}>
        <SearchForm setModalClosed={setSearchOpen} />
      </Modal>
    </>
  )
}

export default SearchModal
