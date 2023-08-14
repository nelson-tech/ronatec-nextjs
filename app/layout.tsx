const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en-us">
      <body>{children}</body>
    </html>
  )
}

export default RootLayout

export const metadata = {
  title: {
    default: "Ronatec C2C, Inc.",
    template: "%s",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  // robots: {
  //   index: true,
  //   follow: true,
  //   nocache: false,
  //   googleBot: {
  //     index: true,
  //     follow: true,
  //     noimageindex: false,
  //     "max-video-preview": -1,
  //     "max-image-preview": "large",
  //     "max-snippet": -1,
  //   },
  // },
}
