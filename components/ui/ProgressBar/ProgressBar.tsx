import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { css } from "@emotion/react"

const ProgressBar = () => {
  const router = useRouter()
  const [progress, setProgress] = useState(0)

  const progressStyle = css`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999999;
    height: 0.15rem;
    width: 100%;
  `

  const indicatorStyle = css`
    /* background-color: yellow; */
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 0;
    transition: all 0.1s linear, opacity 0.3s linear 0.2s;
  `

  useEffect(() => {
    let timer: NodeJS.Timeout

    function start() {
      setProgress(1)

      increment()
    }

    function increment() {
      const timeout = Math.round(Math.random() * 300)

      setProgress(progress => {
        const percent = Math.round(Math.random() * 10)

        const next = Math.min(progress + percent, 80)

        if (next < 80) {
          timer = setTimeout(increment, timeout)

          return next
        }

        return 80
      })
    }

    function complete() {
      clearTimeout(timer)

      setProgress(100)
    }

    router.events.on("routeChangeStart", start)

    router.events.on("routeChangeComplete", complete)

    router.events.on("routeChangeError", complete)

    return () => {
      clearTimeout(timer)

      router.events.off("routeChangeStart", start)

      router.events.off("routeChangeComplete", complete)

      router.events.off("routeChangeError", complete)
    }
  }, [router.events])

  return (
    <div css={progressStyle}>
      <div
        css={indicatorStyle}
        className="bg-teal"
        style={{
          width: `${progress}%`,

          opacity: progress > 0 && progress < 100 ? 1 : 0,
        }}
      />
    </div>
  )
}

export default ProgressBar
