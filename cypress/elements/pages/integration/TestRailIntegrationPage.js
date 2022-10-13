import { integration } from "../../../fixtures/tenantConfig";
import DeleteIntegraionsAlertModal from "./DeleteIntegraionsAlertModal";

class TestRailIntegrationPage {
  constructor() {
    this.titleLabel = "//h1[@class='zeb-page-header__title ng-binding']";

    //integration actions block          // name=enableIntegration
    this.enableDisableButton = "//button[@label='Enable/disable integration']";
    this.deleteIntegrationButton = "//button[@name='deleteIntegration']";

    this.urlInput = "//input[@id='integrationHubUrl']";
    this.usernameInput = "//input[@id='integrationUsername']";
    this.passwordInput = "//input[@id='integrationAccessKey']";

    // footer menu block
    this.testButton = "//button[contains(@class, '_test-integration')]";
    this.cancelButton = "//button[text()='Cancel']";
    this.saveButton = "//button[text()='Save']";

    this.statusIcon = "//div[@class='test-provider-form__footer-messages']//md-icon";
    this.statusMessage = "//div[@class='test-provider-form__footer-messages']//div[@class='test-provider-form__footer-message-text']";
  }

  assertOpened() {
    cy.xpath(this.titleLabel, { timeout: 10000 }).should("contain.text", "TestRail");
    return this;
  }

  enableDisable() {
    cy.xpath(this.enableDisableButton).click();
  }

  delete() {
    cy.xpath(this.deleteIntegrationButton).click();
    const alertModal = new DeleteIntegraionsAlertModal();
    alertModal.acceptDeleting();
  }

  fillUrl(url) {
    cy.xpath(this.urlInput).type(url);
  }

  fillUsername(username) {
    cy.xpath(this.usernameInput).type(username);
  }

  fillPassword(password) {
    cy.xpath(this.passwordInput).type(password);
  }

  test() {
    cy.xpath(this.testButton).click();
  }

  cancel() {
    cy.xpath(this.cancelButton).click();
  }

  save() {
    cy.xpath(this.saveButton).click();
  }

  assertIntegrationConnected() {
    cy.xpath(this.statusMessage, { timeout: 10000 }).should("contain.text", "Integration is connected");
  }

  addIntegration() {
    expect(integration.testrail.url, "TestRail URL is empty!").not.equal(undefined);
    expect(integration.testrail.username, "TestRail username is empty!").not.equal(undefined);
    expect(integration.testrail.password, "TestRail password is empty!").not.equal(undefined);
    this.fillUrl(integration.testrail.url);
    this.fillUsername(integration.testrail.username);
    this.fillPassword(integration.testrail.password);
  }
}

export default TestRailIntegrationPage;
