import { data } from "../../fixtures/tenantConfig";

class LoginPage {
  constructor() {
    this.usernameField = "//*[@id='accessKey']";
    this.passwordField = "//*[@id='password']";
    this.submitButton = "//button[text()='Login']";
  }

  visit() {
    cy.visit(data.baseUrl + "/signin", { failOnStatusCode: false });
    cy.url().should("contain", data.baseUrl);
  }

  fillUsername(username) {
    cy.wait(10);
    cy.xpath(this.usernameField).type(username, { log: false , timeout: 15000});
  }

  fillPassword(password) {
    cy.xpath(this.passwordField).type(password, { log: false , timeout: 15000 });
  }

  submit() {
    cy.xpath(this.submitButton, { timeout: 15000 }).should("be.enabled").click().url().should("not.contain", "/signin");
  }

  login(username, password) {
    this.visit();
    this.fillUsername(username, { timeout: 35000 });
    this.fillPassword(password, { timeout: 15000 });
    this.submit();
  }
}

export default LoginPage;
