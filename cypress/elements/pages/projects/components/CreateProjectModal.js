import TestRunsPage from "../../testruns/TestRunsPage";
import ProjectsPage from "../ProjectsPage";

class CreateProjectModal {
  constructor() {
    this.nameInput = "//input[contains(@name,'projectName')]";
    this.keyInput = "//input[contains(@name,'projectKey')]";
    this.cancelButton = "//span[text()='cancel']/ancestor::button";
    this.createButton = "//span[text()='save' or text()='create']/ancestor::button";
  }

  assertOpened() {
    cy.xpath(this.nameInput).should("be.visible");
    return this;
  }

  fillName(name) {
    cy.wait(1000);
    cy.xpath(this.nameInput).type(name, { log: false });
    return this;
  }

  fillKey(key) {
    cy.wait(1000);
    cy.xpath(this.keyInput).type(key, { log: false });
    return this;
  }

  clickCreate() {
    cy.xpath(this.createButton).should("be.enabled").click();
    return new TestRunsPage();
  }

  clickCancel() {
    cy.xpath(this.cancelButton).click();
    return new ProjectsPage();
  }
}

export default CreateProjectModal;
