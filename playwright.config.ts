import { devices ,PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  projects:[
    {
      name: "chrome",
      use: {
        ...devices["Desktop Chrome"]
      }
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"]
      }
    },
  ],
  testMatch: ["playwright/tests/*"],
  use:{
    baseURL: "https://test-rpg.vercel.app/",
    headless: false,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    // launchOptions:{   uncomment this if u want it to be executed slower than default speed
    //   slowMo: 1000,
    // },
  },
  retries: 2,
  reporter: [["dot"], ["json",{
    outputFile: "jsonReports/jsonReport.json"
  }],["html",{
    open: "never"
  }]]
};

export default config;
