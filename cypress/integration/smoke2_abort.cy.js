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


});
