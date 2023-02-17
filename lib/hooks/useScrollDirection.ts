import { useEffect, useState } from "react"

const useScrollDirection = (offset: number = 10) => {
  const [scrollDirection, setScrollDirection] = useState<"down" | "up" | null>(
    null
  )

  const [atTop, setAtTop] = useState(true)

  useEffect(() => {
    let lastScrollY = window.scrollY

    const updateScrollDirection = () => {
      const scrollY = window.scrollY
      const direction = scrollY > lastScrollY ? "down" : "up"

      scrollY > offset ? setAtTop(false) : setAtTop(true)

      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > offset || scrollY - lastScrollY < -offset)
      ) {
        setScrollDirection(direction)
      }
      lastScrollY = scrollY > 0 ? scrollY : 0
    }
    window.addEventListener("scroll", updateScrollDirection) // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollDirection) // clean up
    }
  }, [scrollDirection, offset])

  return { scrollDirection, atTop }
}

export default useScrollDirection
