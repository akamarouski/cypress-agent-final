import { interfaces } from "mocha";
import { integration } from "../../../fixtures/tenantConfig";
import DeleteIntegraionsAlertModal from "./DeleteIntegraionsAlertModal";
import DeleteIntegrationsAlertModal from "./DeleteIntegrationsAlertModal";

class JiraIntegraitionPage {
  constructor() {
    this.titleLabel = "//h1[@class='zeb-page-header__title ng-binding']";

    // menu block
    this.serverOrDCRadioButton = "//md-radio-button[@value='SERVER_DC']";
    this.cloudRadioButton = "//md-radio-button[@value='CLOUD']";

    //integration actions  block            // name=enableIntegration
    this.enableDisableButton = "//button[@label='Enable/disable integration']";
    this.deleteIntegrationButton = "//button[@name='deleteIntegration']";

    // input fields block
    this.hostInput = "//input[@id='jiraIntegrationHost']";
    this.usernameInput = "//input[@id='jiraIntegrationUsername']";
    this.tokenInput = "//input[@id='jiraIntegrationToken']";

    // TCM block
    this.enableDisableTCMButton = "//md-checkbox[@name='xRayCheckbox']";
    this.currentTCMDropdownButton = "//dropdown-with-icon//span[@class='dropdown-with-icon__button-text ng-binding ng-scope']";
    this.TCMDropdownVariantsButtonsList = "//md-menu-item//button";
    // available only if TCM enabled (XRAY - default)
    this.xrayHostInput = "//input[@id='integrationXrayHost']";
    this.xrayIdInput = "//input[@id='integrationXrayClientId']";
    this.xraySecretIDInput = "//input[@id='integrationXrayClientSecret']";
    // available only if TCM enabled (Zephyr Cloud)
    this.zephyrTokenInput = "//input[@id='zephyrIntegrationToken']";
    // available only if TCM enabled (Zephyr Squad)
    this.zephyrSquadAccoundIdInput = "//input[@id='zephyrSquadIntegrationAccountId']";
    this.zephyrSquadAccessKeyInput = "//input[@id='zephyrSquadIntegrationAccessKey']";
    this.zephyrSquadSecretKey = "//input[@id='zephyrSquadIntegrationSecretKey']";

    // footer menu
    this.testButton = "//button[contains(@class, '_test-integration')]";
    this.cancelButton = "//button[text()='Cancel']";
    this.saveButton = "//button[text()='Save']";

    this.statusIcon = "//div[@class='jira-integration-form__footer-messages']//md-icon";
    this.statusMessage = "//div[@class='jira-integration-form__footer-messages']//div[@class='jira-integration-form__footer-message-text']";
  }

  assertOpened() {
    cy.xpath(this.titleLabel).should("be.visible");
  }

  assertTitleEquals(title) {
    cy.xpath(this.titleLabel).should("contain.text", title);
  }

  chooseServerOrDC() {
    cy.xpath(this.serverOrDCRadioButton).click();
  }

  chooseCloud() {
    cy.xpath(this.cloudRadioButton).click();
  }

  enableDisable() {
    cy.xpath(this.enableDisableButton).click();
  }

  delete() {
    cy.xpath(this.deleteIntegrationButton).click();
    const alertModal = new DeleteIntegrationsAlertModal();
    alertModal.acceptDeleting();
  }

  fillHost(host) {
    cy.xpath(this.hostInput).type(host);
  }

  fillUsername(username) {
    cy.xpath(this.usernameInput).type(username);
  }

  fillToken(token) {
    cy.xpath(this.tokenInput).type(token);
  }

  enableDisableTCM() {
    cy.xpath(this.enableDisableTCMButton).click();
  }

  chooseXrayTCM() {
    this.chooseTCMByName("Xray");
  }

  chooseZephyrCloudTCM() {
    this.chooseTCMByName("Zephyr Cloud");
  }

  chooseZephyrSquadTCM() {
    this.chooseTCMByName("Zephyr Squad");
  }

  chooseXrayTCM() {
    this.chooseTCMByName("Xray");
  }

  chooseTCMByName(name) {
    cy.xpath(this.currentTCMDropdownButton)
      .invoke("text")
      .then((t) => {
        if (!(t.includes(name))) {
          cy.xpath(this.currentTCMDropdownButton).click();
          cy.xpath(this.TCMDropdownVariantsButtonsList, { timeout: 20000 }).contains(name).click();
        }
      });
  }

  assertXrayCurrentTCM() {
    this.assertCurrentTCM("Xray");
  }

  assertZephyrCloudCurrentTCM() {
    this.assertCurrentTCM("Zephyr Cloud");
  }

  assertZephyrSquadCurrentTCM() {
    this.assertCurrentTCM("Zephyr Squad");
  }

  fillXrayHost(host) {
    cy.xpath(this.xrayHostInput).type(host);
  }

  fillXrayId(id) {
    cy.xpath(this.xrayIdInput).type(id);
  }

  fillXraySecretId(secretId) {
    cy.xpath(this.xraySecretIDInput).type(secretId);
  }

  /**
   * Available only if TCM enabled and choosed Zephyr Cloud
   */
  fillZephyrTokey(token) {
    cy.xpath(this.zephyrTokenInput).type(token);
  }

  fillZephyrSquadAccoundId(accountId) {
    cy.xpath(this.zephyrSquadAccoundIdInput).type(accountId);
  }

  fillZephyrSquadAccessKeyInput(accessKey) {
    cy.xpath(this.zephyrSquadAccessKeyInput).type(accessKey);
  }

  fillZephyrSquadSecretKey(secretKey) {
    cy.xpath(this.zephyrSquadSecretKey).type(secretKey);
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
    cy.xpath(this.statusMessage).should("contain.text", "Integration is connected.");
  }

  addJiraXrayIntegration() {
    this.chooseCloud();
    expect(integration.jira.url, "Jira host is empty!").not.equal(undefined);
    expect(integration.jira.username, "Jira username is empty!").not.equal(undefined);
    expect(integration.jira.token, "Jira token is empty!").not.equal(undefined);

    this.fillHost(integration.jira.url);
    this.fillUsername(integration.jira.username);
    this.fillToken(integration.jira.token);

    this.enableDisableTCM();
    this.chooseXrayTCM();

    expect(integration.xray.ulr, "Xray host is empty!").not.equal(undefined);
    expect(integration.xray.clientId, "Xray id is empty!").not.equal(undefined);
    expect(integration.xray.clientSecret, "Xray secret id is empty!").not.equal(undefined);
    this.fillXrayHost(integration.xray.ulr);
    this.fillXrayId(integration.xray.clientId);
    this.fillXraySecretId(integration.xray.clientSecret);
  }

  addJiraZephyrSquadIntegration() {
    this.chooseCloud();
    expect(integration.jira.url, "Jira host is empty!").not.equal(undefined);
    expect(integration.jira.username, "Jira username is empty!").not.equal(undefined);
    expect(integration.jira.token, "Jira token is empty!").not.equal(undefined);

    this.fillHost(integration.jira.url);
    this.fillUsername(integration.jira.username);
    this.fillToken(integration.jira.token);

    this.enableDisableTCM();
    this.chooseZephyrSquadTCM();

    expect(integration.zephur.zephyrSquadAccountId, "Zephyr Squad id is empty!").not.equal(undefined);
    expect(integration.zephur.zephyrSquadAccessKey, "Zephur Squad access key is empty!").not.equal(undefined);
    expect(integration.zephur.zephyrSquadSecretKey, "Zephur Squad secret key is empty!").not.equal(undefined);
    this.fillZephyrSquadAccoundId(integration.zephur.zephyrSquadAccountId);
    this.fillZephyrSquadAccessKeyInput(integration.zephur.zephyrSquadAccessKey);
    this.fillZephyrSquadSecretKey(integration.zephur.zephyrSquadSecretKey);
  }

}

export default JiraIntegraitionPage;
