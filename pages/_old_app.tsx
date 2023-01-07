import "@styles/tailwind.css"
// import "keen-slider/keen-slider.min.css"

import { AppProps } from "next/app"
import dynamic from "next/dynamic"
import { Router } from "next/router"
import { DefaultSeo } from "next-seo"

import ProgressBar from "@lib/progressBar"
import { useCreateStore, Provider } from "@lib/store"
import { useEffect, useState } from "react"
import { getAuthToken } from "@api/urql/utils"
import LoadingSpinner from "@components/ui/LoadingSpinner"

// ####
// #### Dynamic Imports
// ####

const Unauthorized = dynamic(() => import("@components/Unauthorized"), {
  ssr: false,
})

// ####
// #### Variables
// ####

// const Noop: FC = ({ children }) => <>{children}</>

export const progress = new ProgressBar({
  size: 2,
  color: "#32de8a",
  className: "progress-bar",
  delay: 100,
})

Router.events.on("routeChangeStart", () => progress.start())
Router.events.on("routeChangeComplete", () => progress.finish())
Router.events.on("routeChangeError", () => progress.finish())

// ####
// #### Component
// ####

function RonatecWebsite({ Component, pageProps }: AppProps) {
  const createStore = useCreateStore(pageProps.initStore)

  // const cdnURL = process.env.NEXT_PUBLIC_CDN_BASE_URL
  // const faviconURL = `${cdnURL}/ronatec/favicons`

  // User authentication
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)

  useEffect(() => {
    let auth = false
    if (pageProps.protected) {
      const authToken = getAuthToken()?.authToken
      authToken && (auth = true)
    }
    if (isAuthorized === null) {
      setIsAuthorized(auth)
    }
  }, [pageProps, isAuthorized, setIsAuthorized])

  if (pageProps.protected && isAuthorized === null) {
    return (
      <>
        <div
          className="flex flex-col w-full h-screen justify-center items-center"
          data-testid="app-protected-loading"
        >
          <div className="text-gray-600 mb-8">Checking authorization...</div>
          <LoadingSpinner size={24} />
        </div>
      </>
    )
  }

  return (
    <div data-testid="custom-app">
      {/* <DefaultSeo
        openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://ronatec.us/",
          site_name: "Ronatec C2C",
        }}
        titleTemplate="Ronatec | %s"
        defaultTitle="Ronatec C2C"
        additionalLinkTags={[
          {
            rel: "shortcut icon",
            href: `${faviconURL}/favicon.ico`,
          },
          {
            rel: "icon",
            href: `${faviconURL}/favicon.ico`,
          },
          {
            rel: "icon",
            href: `${faviconURL}/favicon-32x32.png`,
            sizes: "32x32",
          },
          {
            rel: "icon",
            href: `${faviconURL}/favicon-16x16.png`,
            sizes: "16x16",
          },
          {
            rel: "apple-touch-icon",
            href: `${faviconURL}/apple-touch-icon.png`,
            sizes: "180x180",
          },
          {
            rel: "mask-icon",
            href: `${faviconURL}/safari-pinned-tab.svg`,
          },
          {
            rel: "manifest",
            href: `${faviconURL}/site.webmanifest`,
          },
          {
            rel: "preload",
            href: `${cdnURL}/fonts/Exo/Exo-VariableFont_wght.ttf`,
            as: "font",
            type: "font/ttf",
            crossOrigin: "anonymous",
          },
        ]}
        additionalMetaTags={[
          {
            name: "application-name",
            content: "Ronatec",
          },
          {
            name: "apple-mobile-web-app-title",
            content: "Ronatec",
          },
          {
            name: "theme-color",
            content: "#ffffff",
          },
          {
            name: "msapplication-TileColor",
            content: "#ffffff",
          },
          {
            name: "msapplication-config",
            content: "${faviconURL}/browserconfig.xml",
          },
        ]}
      /> */}
      <Provider createStore={createStore}>
        {pageProps.protected && !isAuthorized ? (
          <Unauthorized {...pageProps} />
        ) : (
          <Component {...pageProps} />
        )}
      </Provider>
    </div>
  )
}

export default RonatecWebsite
