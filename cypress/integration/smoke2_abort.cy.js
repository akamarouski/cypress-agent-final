// Enables intelligent code completion for commands
/// <reference types="cypress-xpath" />
/// <reference types="Cypress" />
/// <reference types="cypress-localstorage-commands" />

import LoginPage from "../elements/pages/LoginPage";
import ProjectsPage from "../elements/pages/projects/ProjectsPage";
import ApiClient from "../utils/api-service";
import TenantHeader from "../elements/pages/projects/components/TenantHeader";
import TestRunsPage from "../elements/pages/testruns/TestRunsPage";
import LauncherFirstTime from "../elements/pages/launcher/LauncherFirstTime";
import AddOrEditLauncherPage from "../elements/pages/launcher/AddOrEditLauncherPage";
import NavigationMenu from "../elements/pages/testruns/components/NavigationMenu";
import TestRunDetailsPage from "../elements/pages/TestRunDetailsPage";
const { data, testdata, label, testRunPreview } = require("../fixtures/tenantConfig");

const projectName = Math.random().toString(36).substring(3, 9);
let projectKey = projectName.slice(0, 5).toUpperCase();
const localStorageLoginName = "login";
const milestoneName = "cypress";
const carinaDemoApiRunName = "Carina Demo Tests - API Sample";

describe("Smoke tests", () => {
  before(() => {
    try {
      cy.clearLocalStorage(localStorageLoginName);
    } catch (err) {
      // do nothing
    }
    expect(data.user, "Tenant username is empty").not.equal(undefined);
    expect(data.password, "Tenant password is empty").not.equal(undefined);
    const loginPage = new LoginPage();
    loginPage.login(data.user, data.password);

    cy.saveLocalStorage(localStorageLoginName);
  });

  after(() => {
    (async () => {
      let projectId = await new ApiClient().getProjectIdByKey(projectKey);
      await new ApiClient().deleteProjectById(projectId);
    })();
  })

  beforeEach(() => {
    try {
      cy.restoreLocalStorage(localStorageLoginName);
    } catch (err) {
      // ignore errors
    }
  });

  it("1 Login test", {
    defaultCommandTimeout: 10000,
    'owner': 'jhetfield', 'testrailTestCaseId': '1', 'xrayTestKey': 'ZEB-51'
  }, () => {
    const loginPage = new LoginPage();
    try {
      cy.clearLocalStorage();
    } catch (err) {
      // do nothing
    }
    loginPage.visit();
    loginPage.login(data.user, data.password);
    const testRunsPage = new TestRunsPage();
    testRunsPage.assertOpened();
  });

  it("2 Create project", {
    defaultCommandTimeout: 10000,
    'owner': 'hpotter', 'testrailTestCaseId': '2', 'xrayTestKey': 'ZEB-24'
  }, () => {

    const projectsPage = new ProjectsPage();
    projectsPage.visit();
    projectsPage.assertPageOpened();
    const header = new TenantHeader();
    const createProjectModal = header.openProjectsActionsMenu().createProject().assertOpened();
    createProjectModal.fillName(projectName);
    createProjectModal.fillKey(projectKey);
    const testRunsPage = createProjectModal.clickCreate();
  //  testRunsPage.assertOpenedByProjectKey(projectKey);
    cy.then(() => {
      new ApiClient().startTestRun(projectKey, carinaDemoApiRunName);
    })
    testRunsPage.assertOpenedByProjectKey(projectKey);
  });

  it("3 Add launcher repo",
    { 'owner': 'jhetfield', 'testrailTestCaseId': '3', 'xrayTestKey': 'ZEB-18' }, () => {
      
      let testRunsPage1 = new TestRunsPage();
      testRunsPage1.visitByProjectKey(projectKey);
      testRunsPage1.assertOpened();
      testRunsPage1.clickLaunch();
      const launchFirstTime = new LauncherFirstTime();
      launchFirstTime.assertOpened();
      launchFirstTime.fillUrl(testdata.gitHubUrl);
      const launchersPage = launchFirstTime.clickAddRepo();
      cy.wait(60000);
      launchersPage.assertOpened();
      cy.wait(3000)
    });

  // it("4 Create launcher",
  //   { 'owner': 'sholmes', 'testrailTestCaseId': '4', 'xrayTestKey': 'ZEB-17' }, () => {
  //     const testRunsPage = new TestRunsPage();
  //     testRunsPage.visitByProjectKey(projectKey);
  //     testRunsPage.assertOpened();
  //     const launchersPage = testRunsPage.clickLaunch();
  //     launchersPage.assertOpened();
  //     launchersPage.chooseRepoByName("zebrunner/carina-demo");
  //     launchersPage.openNewLauncherAdding();

  //     const addOrEditLauncherPage = new AddOrEditLauncherPage();
  //     addOrEditLauncherPage.assertOpened();

  //     addOrEditLauncherPage.fillLauncherName("Carina API");
  //     addOrEditLauncherPage.chooseBranchByName(testdata.branch);
  //     addOrEditLauncherPage.chooseDockerImage(testdata.dockerImage);
  //     addOrEditLauncherPage.fillLaunchCommand(testdata.launchCommand);
  //     addOrEditLauncherPage.createNewEnvironmentVariable(testdata.variableName, "string", testdata.variableValue);
  //     addOrEditLauncherPage.acceptLauncherAdding();
  //     launchersPage.assertOpened();
  //     launchersPage.assertLauncherPresent("Carina API");
  //   });

  // it("5 Create milestone",
  //   { 'owner': 'sholmes', 'testrailTestCaseId': '5', 'xrayTestKey': 'ZEB-63' }, () => {
  //     const testRunsPage = new TestRunsPage();
  //     testRunsPage.visitByProjectKey(projectKey);
  //     testRunsPage.assertOpened();
  //     const navigationMenu = new NavigationMenu();
  //     const milestonePage = navigationMenu.toMilestonePage();
  //     milestonePage.assertOpened();
  //     milestonePage.addMilestone(milestoneName);
  //     milestonePage.assertPopUpAppeared();
  //     milestonePage.assertPopUpTextEquals("Milestone was successfully created");
  //   });

  // it("6 Assign milestone to Test Run",
  //   { "owner": "hpotter", 'testrailTestCaseId': '6', 'xrayTestKey': 'ZEB-65' }, () => {
  //     (async () => { await new ApiClient().startTestRun(projectKey, carinaDemoApiRunName) })();
  //     let testRunsPage = new TestRunsPage();
  //     testRunsPage.visitByProjectKey(projectKey);
  //     testRunsPage.assertOpened();
  //     testRunsPage.assignMilestoneToTestRun(carinaDemoApiRunName, milestoneName);
  //     testRunsPage.isMilestonePreentOnTestRunCard(carinaDemoApiRunName)
  //     testRunsPage.milestoneOnTestRunCardShouldHaveName(carinaDemoApiRunName, milestoneName)
  //   });

  // it("7 Create Dashboard",
  //   { 'owner': 'sholmes', 'testrailTestCaseId': '7', 'xrayTestKey': 'ZEB-19' }, () => {
  //     const testRunsPage = new TestRunsPage();
  //     testRunsPage.visitByProjectKey(projectKey);
  //     testRunsPage.assertOpened();
  //     const navigationMenu = new NavigationMenu();
  //     const dashboardsPage = navigationMenu.toDashboardPage();
  //     dashboardsPage.assertOpened();
  //     const newDashboardModal = dashboardsPage.openAddDashboardModal();
  //     newDashboardModal.assertOpened();
  //     newDashboardModal.fillDashboardName("Cypress Demo");
  //     newDashboardModal.submit();
  //     cy.xpath("//span[text()='New widget']").should("be.visible");
  //   });

  // it("8 Open and test  connnection to TestRail",
  //   { 'owner': 'mpoppins', 'testrailTestCaseId': '8', 'xrayTestKey': 'ZEB-20' }, () => {
  //     const testRunsPage = new TestRunsPage();
  //     testRunsPage.visitByProjectKey(projectKey);
  //     testRunsPage.assertOpened();
  //     const navigationMenu = new NavigationMenu();
  //     const integrationPage = navigationMenu.toIntegrationsPage();
  //     integrationPage.assertOpened();
  //     const testRailPage = integrationPage.toTestRailIntegration();
  //     testRailPage.assertOpened();
  //     testRailPage.addIntegration();
  //     testRailPage.test();
  //     testRailPage.assertIntegrationConnected();
  //   });

  // it("9 Open and test  connnection to Jira + Xray and Jira + Zephur",
  //   { 'owner': 'sholmes', 'testrailTestCaseId': '8', 'xrayTestKey': 'ZEB-20' }, () => {
  //     const testRunsPage = new TestRunsPage();
  //     testRunsPage.visitByProjectKey(projectKey);
  //     testRunsPage.assertOpened();
  //     const navigationMenu = new NavigationMenu();
  //     let integrationPage = navigationMenu.toIntegrationsPage();
  //     let jiraIntegrationPage = integrationPage.toJiraIntegration();
  //     jiraIntegrationPage.assertOpened();
  //     jiraIntegrationPage.addJiraXrayIntegration();
  //     jiraIntegrationPage.test();
  //     jiraIntegrationPage.assertIntegrationConnected();

  //     integrationPage = navigationMenu.toIntegrationsPage();
  //     jiraIntegrationPage = integrationPage.toJiraIntegration();
  //     jiraIntegrationPage.assertOpened();
  //     jiraIntegrationPage.addJiraZephyrSquadIntegration();
  //     jiraIntegrationPage.test();
  //     jiraIntegrationPage.assertIntegrationConnected();

  //   });

  // it("10 Verify Preview of a test case from Zephyr",
  //   { 'owner': 'sholmes', 'testrailTestCaseId': '10', 'xrayTestKey': 'ZEB-23' }, () => {
  //     let testRunName = "MY_RUN_FOR_ZEPHYR";
  //     let testName = "MY_TEST_FOR_ZEPHYR";
  //     (async () => {
  //       let projectId = await new ApiClient().getProjectIdByKey(projectKey);
  //       await new ApiClient().addJiraZephurIntegration(projectId);
  //       const testRunId = await new ApiClient().startTestRun(projectKey, testRunName);
  //       let testId = await new ApiClient().startTest(testRunId, testName);
  //       await new ApiClient().sendTestLabels(testRunId, testId, label.zephur.caseId_key, "ZEB-52");
  //     })();
  //     cy.wait(3000)
  //     const testRunsPage = new TestRunsPage();
  //     testRunsPage.visitByProjectKey(projectKey);
  //     testRunsPage.assertOpened();
  //     testRunsPage.getTestRunCardByName(testRunName).click();
  //     let testRunDetailsPage = new TestRunDetailsPage();
  //     let labelModal = testRunDetailsPage.clickZephurIconOnTestCard(testName);
  //     labelModal.assertTitle(testRunPreview.modal.title);
  //     labelModal.assertStepPresent(testRunPreview.modal.stepContent);
  //     labelModal.assertExpectedResult(testRunPreview.modal.expectedResult);
  //   })

  // it("11 Verify Preview of a test case from Xray",
  //   { 'owner': 'rhood', 'testrailTestCaseId': '9', 'xrayTestKey': 'ZEB-22' }, () => {
  //     let testRunName = "MY_RUN_FOR_XRAY";
  //     let testName = "MY_TEST_FOR_XRAY";
  //     (async () => {
  //       let projectId = await new ApiClient().getProjectIdByKey(projectKey);
  //       await new ApiClient().addJiraXrayIntegration(projectId);
  //       const testRunId = await new ApiClient().startTestRun(projectKey, testRunName);
  //       let testId = await new ApiClient().startTest(testRunId, testName);
  //       await new ApiClient().sendTestLabels(testRunId, testId, label.xray.caseId_key, "ZEB-51");
  //     })();
  //     cy.wait(3000)
  //     const testRunsPage = new TestRunsPage();
  //     testRunsPage.visitByProjectKey(projectKey);
  //     testRunsPage.assertOpened();
  //     testRunsPage.getTestRunCardByName(testRunName).click();
  //     let testRunDetailsPage = new TestRunDetailsPage();
  //     let labelModal = testRunDetailsPage.clickXrayIconOnTestCard(testName);
  //     labelModal.assertTitle(testRunPreview.modal.title);
  //     labelModal.assertStepPresent(testRunPreview.modal.stepContent);
  //     labelModal.assertExpectedResult(testRunPreview.modal.expectedResult);
  //   })

  // it("12 Verify Preview of a test case from TestRail",
  //   { 'owner': 'rhood', 'testrailTestCaseId': '11', 'xrayTestKey': 'ZEB-21' }, () => {
  //     let testRunName = "MY_RUN_FOR_TESTRAIL";
  //     let testName = "MY_TEST_FOR_TESTRAIL";
  //     (async () => {
  //       let projectId = await new ApiClient().getProjectIdByKey(projectKey);
  //       await new ApiClient().addTestrailIntegration(projectId);
  //       const testRunId = await new ApiClient().startTestRun(projectKey, testRunName);
  //       let testId = await new ApiClient().startTest(testRunId, testName);
  //       await new ApiClient().sendTestLabels(testRunId, testId, label.testRail.caseId_key, "1");
  //     })();
  //     cy.wait(3000)
  //     const testRunsPage = new TestRunsPage();
  //     testRunsPage.visitByProjectKey(projectKey);
  //     testRunsPage.assertOpened();
  //     testRunsPage.getTestRunCardByName(testRunName).click();
  //     let testRunDetailsPage = new TestRunDetailsPage();
  //     let labelModal = testRunDetailsPage.clickTestRailIconOnTestCard(testName);
  //     labelModal.assertTitle(testRunPreview.modal.title);
  //     labelModal.assertExpectedResult(testRunPreview.modal.expectedResult);
  //     labelModal.assertStepPresent(testRunPreview.modal.stepContent)
  //   })

});
