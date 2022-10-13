import TestRunsPage from "../testruns/TestRunsPage";

class ConcreteLauncherPage {
  constructor() {
    this.launchButton = "//button[text()='Launch']";
  }

  runLauncher() {
    cy.wait(1000);
    cy.xpath(this.launchButton).click();
    return new TestRunsPage();
  }
}

export default ConcreteLauncherPage;
