import "@styles/tailwind.css"
// import "keen-slider/keen-slider.min.css"

import { AppProps } from "next/app"
import { Router } from "next/router"
import { DefaultSeo } from "next-seo"

import { ProgressBar } from "@lib"
import { useCreateStore, Provider } from "@lib/store"

// ####
// #### Variables
// ####

// const Noop: FC = ({ children }) => <>{children}</>

const progress = new ProgressBar({
  size: 2,
  color: "#32de8a",
  className: "progress-bar",
  delay: 100,
})

Router.events.on("routeChangeStart", progress.start)
Router.events.on("routeChangeComplete", progress.finish)
Router.events.on("routeChangeError", progress.finish)

// ####
// #### Component
// ####

function RonatecWebsite({ Component, pageProps }: AppProps) {
  const createStore = useCreateStore(pageProps.initStore)

  const cdnURL = process.env.NEXT_PUBLIC_CDN_BASE_URL
  const faviconURL = `${cdnURL}/ronatec/favicons`

  return (
    <>
      <DefaultSeo
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
      />
      <Provider createStore={createStore}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default RonatecWebsite
