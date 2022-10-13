import AddMilestoneModal from "./component/AddMilestoneModal";

class MilestonePage {
  constructor() {
    this.addMilestoneButton = "//button[contains(@class, 'gtm-milestones-add-button')]";
    this.milestone = "//span[contains(@class,'md-toast-text ng-binding')]";
  }

  assertOpened() {
    cy.xpath(this.addMilestoneButton).should("be.visible");
  }

  visitByProjectKey(key) {
    cy.visit(Cypress.env("TENANT_URL") + "/projects/" + key + "/milestones", { failOnStatusCode: false });
  }

  assertPopUpAppeared() {
    cy.xpath(this.milestone).should("be.visible");
  }

  assertPopUpTextEquals(text) {
    cy.xpath(this.milestone).contains(text);
  }

  addMilestone(milestoneName) {
    cy.wait(1000);
    cy.xpath(this.addMilestoneButton).click();
    cy.wait(1000);
    const addMilestoneModal = new AddMilestoneModal();
    cy.wait(1000);
    addMilestoneModal.assertOpened();
    cy.wait(1000);
    addMilestoneModal.fillMilestoneTitle(milestoneName);
    cy.wait(1000);
    addMilestoneModal.acceptMilestoneAdding();
    cy.wait(1000);
  }
}

export default MilestonePage;
