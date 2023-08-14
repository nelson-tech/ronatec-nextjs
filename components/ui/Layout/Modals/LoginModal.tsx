import useStore from "@hooks/useStore"

import Modal from "@components/ui/Modal"
import LoginForm from "@components/LoginForm"

// ####
// #### Component
// ####

const LoginModal = () => {
  const { login, setLoginOpen } = useStore((state) => ({
    login: state.auth.loginModal,
    setLoginOpen: state.auth.setLoginModalOpen,
  }))

  return (
    <>
      <Modal open={login} setOpen={setLoginOpen}>
        <LoginForm setOpen={setLoginOpen} />
      </Modal>
    </>
  )
}

export default LoginModal
