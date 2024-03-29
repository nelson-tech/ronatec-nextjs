import { PlaywrightTestConfig } from "@playwright/test"

const config: PlaywrightTestConfig = {
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: "on-first-retry",
    baseURL: "http://localhost:3000",
  },
  projects: [
    {
      name: "ARTillery Design",
      testDir: "./__e2e__",
    },
  ],
}

export default config
