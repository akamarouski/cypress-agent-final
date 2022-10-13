import JiraIntegraitionPage from "./JiraIntegraitionPage";
import TestRailIntegrationPage from "./TestRailIntegrationPage";

class IntegrationsPage {
  constructor() {
    this.header = "//zeb-page-header";
    this.integrationCards = "//integration-card";
  }

  visitByProjectKey(key) {
    cy.visit(Cypress.env("TENANT_URL") + "/projects/" + key + "/integrations", { failOnStatusCode: false });
  }
  
  assertOpened() {
    cy.xpath(this.header).should("be.visible");
    return this;
  }

  toTestRailIntegration() {
    this.toIntegration("TestRail");
    return new TestRailIntegrationPage();
  }

  toJiraIntegration() {
    this.toIntegration("Jira");
    return new JiraIntegraitionPage();
  }

  toIntegration(integrationName) {
    cy.wait(2000);
    cy.xpath(this.integrationCards + "//div[contains(@class, 'integration-card__name')]", { timeout: 20000 }).then((foundIntegrationCards) => {
      for (let i = 0; i < foundIntegrationCards.length; i++) {
        if (foundIntegrationCards[i].innerText.includes(integrationName)) {
          foundIntegrationCards[i].click();
        }
      }
    });
  }
}

export default IntegrationsPage;
