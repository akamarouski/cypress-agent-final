class AddDashboardModal {
  constructor() {
    this.dashboardNameInput = "//input[@name='title']";
    this.submitButton = "//button[@type='submit']";
  }

  assertOpened() {
    cy.xpath(this.dashboardNameInput).should("be.visible");
  }

  fillDashboardName(dashboardName) {
    cy.xpath(this.dashboardNameInput).type(dashboardName);
  }

  submit() {
    cy.xpath(this.submitButton).click();
  }
}

export default AddDashboardModal;
