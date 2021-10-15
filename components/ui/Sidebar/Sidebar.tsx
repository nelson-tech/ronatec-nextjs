import { FC, useEffect, useRef } from "react"
import tw from "twin.macro"
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock"

interface Props {
  children: any
  isOpen: boolean
  onClose: () => void
}

const Sidebar: FC<Props> = ({ children, isOpen, onClose }) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    if (ref.current) {
      if (isOpen) {
        disableBodyScroll(ref.current)
      } else {
        enableBodyScroll(ref.current)
      }
    }

    return () => {
      clearAllBodyScrollLocks()
    }
  }, [isOpen])

  return (
    <>
      {isOpen ? (
        <div ref={ref} css={tw`fixed inset-0 overflow-hidden h-full z-50`}>
          <div css={tw`absolute inset-0 overflow-hidden`}>
            <div
              onClick={onClose}
              css={tw`absolute inset-0 bg-black bg-opacity-50 transition-opacity`}
            />
            <section
              css={tw`absolute inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16 outline-none`}
            >
              <div css={tw`h-full md:w-screen md:max-w-md`}>
                <div
                  css={tw`h-full flex flex-col text-base bg-accents-1 shadow-xl overflow-y-auto`}
                >
                  {children}
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Sidebar
