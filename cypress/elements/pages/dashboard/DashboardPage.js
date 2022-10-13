import AddDashboardModal from "./AddDashboardModal";

class DashboardPage {
  constructor() {
    this.addDashboardButton = "//span[text()='Add dashboard']/ancestor::button";
  }

  assertOpened() {
    cy.xpath(this.addDashboardButton).should("be.visible");
  }

  openAddDashboardModal() {
    cy.xpath(this.addDashboardButton).click();
    return new AddDashboardModal();
  }
  
}
export default DashboardPage;
