import LaunchersPage from "../launcher/LaunchersPage";
import TestRunCard from "./components/TestRunCard";
import AssignToMilestoneModal from "./components/AssignToMilestoneModal";


class TestRunsPage {
  constructor() {
    this.launchButton = "//button[@class='MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation button   css-1obwva5']";
    this.popUp = "//span[contains(@class,'md-toast-text ng-binding')]";
    this.testRunCards = "//div[@class='test-run-card ng-scope ng-isolate-scope']";
  }

  clickLaunch() {
   
    // cy.xpath(this.launchButton,{timeout:2000000}).first().should('be.visible');
    cy.xpath(this.launchButton, { timeout: 500000 }).click({ force: true });
    return new LaunchersPage();
  }

  visitByProjectKey(key) {
    cy.visit(Cypress.env("TENANT_URL") + "/projects/" + key + "/automation-launches", {failOnStatusCode: false});
    cy.url().should("contain", Cypress.env("TENANT_URL") + "/projects/" + key + "/automation-launches")
  }

  assertOpened() {
    cy.url().should("contain", "automation-launches", { timeout: 15000 });

    cy.xpath(this.launchButton, { timeout: 50000 }).should("be.visible", { timeout: 15000 });
    return this;
  }

  assertOpenedByProjectKey(key) {
    cy.url().should("contain", Cypress.env("TENANT_URL") + "/projects/" + key + "/automation-launches");
  }

  getTestRunCardByName(cardName) {
    return cy.xpath(this.testRunCards, { timeout: 5000 })
      .contains(cardName)
      .parents("div.test-run-card");
  }

  assignMilestoneToTestRun(testRunName, milestoneName) {
    this.getTestRunCardByName(testRunName)
      .within(() => {
        new TestRunCard().openSettings()
          .openAssingToMilestoneModal()
      })
      .then(() => {
        new AssignToMilestoneModal().selectMilestone(milestoneName)
        cy.xpath(new AssignToMilestoneModal().assignButton).click()
      })
  }

  isMilestonePreentOnTestRunCard(testRunName) {
    this.getTestRunCardByName(testRunName)
      .within(() => {
        new TestRunCard().assertMilestoneLabelExists();
      })
  }

  milestoneOnTestRunCardShouldHaveName(testRunName, milestoneName) {
    this.getTestRunCardByName(testRunName)
      .within(() => {
        new TestRunCard().assertMilestoneText(milestoneName);
      })
  }
}

export default TestRunsPage;
