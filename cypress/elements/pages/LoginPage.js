import { data } from "../../fixtures/tenantConfig";

class LoginPage {
  constructor() {
    this.usernameField = "//input[@name='username']";
    this.passwordField = "//input[@name='password']";
    this.submitButton = "//button[@type='submit']";
  }

  visit() {
    cy.visit(data.baseUrl + "/signin", { failOnStatusCode: false });
    cy.url().should("contain", "komar.zebrunner.dev");
  }

  fillUsername(username) {
    cy.xpath(this.usernameField).type(username, { log: false });
  }

  fillPassword(password) {
    cy.xpath(this.passwordField).type(password, { log: false });
  }

  submit() {
    cy.xpath(this.submitButton, { timeout: 15000 }).should("be.enabled").click().url().should("not.contain", "/signin");
  }

  login(username, password) {
    this.visit();
    this.fillUsername(username, { timeout: 15000 });
    this.fillPassword(password, { timeout: 15000 });
    this.submit();
  }
}

export default LoginPage;
