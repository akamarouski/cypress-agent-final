import LaunchersPage from "./LaunchersPage";

class LauncherFirstTime {
  constructor() {
    this.githubBytton = "//span[contains(text(),'Github')]//ancestor::button";
    this.urlInput = "//input[@id='url']";
    this.usernameInput = "//input[@id='username']";
    this.tokenInput = "//input[@id='token']";
    this.addButton = "//button[text()='Add']";
  }

  assertOpened() {
    cy.xpath(this.githubBytton, {timeout: 10000}).first().should("be.visible");
  }

  fillUrl(url) {
    cy.xpath(this.urlInput).type(url);
  }

  fillUsername(username) {
    cy.xpath(this.usernameInput).type(username);
  }

  fillToken(token) {
    cy.xpath(this.tokenInput).type(token);
  }

  clickAddRepo() {
    cy.xpath(this.addButton).click();
    return new LaunchersPage();
  }
}

export default LauncherFirstTime;
