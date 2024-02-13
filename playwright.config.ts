import type { PlaywrightTestConfig } from "playwright/test";

const config: PlaywrightTestConfig = {
  testMatch: ["playwright/tests/*"],
  use:{
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
