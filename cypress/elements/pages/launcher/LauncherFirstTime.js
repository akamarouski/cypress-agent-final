import LaunchersPage from "./LaunchersPage";

class LauncherFirstTime {
  constructor() {
    this.githubBytton = "//span[contains(text(),'Github')]//ancestor::button";
    this.urlInput = "//input[@name='addRepoUrl']";
    this.usernameInput = "//input[@name='addRepoUsername']";
    this.tokenInput = "//input[@name='addRepoAccessToken']";
    this.addButton = "//button[text()='Add']";
  }

  assertOpened() {
    cy.xpath(this.githubBytton).should("be.visible");
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
