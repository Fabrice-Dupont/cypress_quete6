const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '6m5idd',
  env: {
    MAILSLURP_API_KEY: "593a3b117cc273c364f0693b6a040b56261a99644023ae9475dd5fe69dc61251",
  },
  reporter: "cypress-mochawesome-reporter",

  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
    defaultCommandTimeout: 40000,
    responseTimeout: 40000,
    requestTimeout: 40000,
  },
});
