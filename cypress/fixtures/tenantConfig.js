require("dotenv").config();
exports.data = {
    projectKey: "DEF",
    env: "dev",
    tenatName: "devtests",
   
    baseUrl:  Cypress.env("TENANT_URL")|| "https://komar.zebrunner.dev",
    user:  Cypress.env("CREDENTIALS_TENANT_USERNAME"),
    password:  Cypress.env("CREDENTIALS_TENANT_PASSWORD")
 
 }
 exports.testdata = {
    gitHubUrl:"https://github.com/zebrunner/carina-demo",
    launcherName: "Launcher_api_".concat(Math.random().toString(36).substring(3, 9)),
    branch: "master",
    variableName: "SUITE",
    variableValue: "api",
    dockerImage: "maven:3.8-openjdk-11",
    launchCommand: "mvn clean test -Dsuite=${SUITE}"
 }
 
 exports.integration = {
    testrail:{
       url: Cypress.env("CREDENTIALS_TESTRAIL_URL") || "https://zebrunner.testrail.io",
       username: Cypress.env("CREDENTIALS_TESTRAIL_USERNAME"),
       password: Cypress.env("CREDENTIALS_TESTRAIL_PASSWORD")
    },
    jira:{
       url: Cypress.env("CREDENTIALS_JIRA_HOST") || "https://zebrunner.atlassian.net",
       username: Cypress.env("CREDENTIALS_JIRA_USERNAME"),
       token: Cypress.env("CREDENTIALS_JIRA_TOKEN")
       
    },
    xray: {
       ulr: Cypress.env("CREDENTIALS_XRAY_HOST")|| "https://xray.cloud.getxray.app",
       clientId: Cypress.env("CREDENTIALS_XRAY_ID") ,
       clientSecret: Cypress.env("CREDENTIALS_XRAY_SECRET_ID") 
    },
    zephur:{
       zephyrSquadAccessKey: Cypress.env("CREDENTIALS_ZEPHYR_SQUAD_ACCESS_KEY") ,
       zephyrSquadAccountId: Cypress.env("CREDENTIALS_ZEPHYR_SQUAD_ACCOUNT_ID"),
       zephyrSquadSecretKey: Cypress.env("CREDENTIALS_ZEPHYR_SQUAD_SECRET_KEY")
    }
 }
 exports.label={
    testRail:{
       caseId_key:"com.zebrunner.app/tcm.testrail.case-id",
       suiteId_key:"com.zebrunner.app/tcm.testrail.suite-id"
    },
    xray:{
       caseId_key:"com.zebrunner.app/tcm.xray.test-key"
    },
    zephur:{
       caseId_key:"com.zebrunner.app/tcm.zephyr.test-case-key"
    }
 }
 
 exports.testRunPreview={
    modal:{
       title:"Sign in to",
       stepContent:"Open sign in page",
       expectedResult:"User is redirected to"
 
    }
 }