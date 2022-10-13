import AssignToMilestoneModal from "./AssignToMilestoneModal";

class TestRunCardSettings {
  constructor() {
    this.testRunCardSettings = "//div[@class='_md md-open-menu-container md-whiteframe-z2 md-active md-clickable']";
    this.assignToMilestoneButton = "[name='showMilestoneDialog']";
  }

  openAssingToMilestoneModal() {
    const settings = cy.xpath(this.testRunCardSettings);
    settings.find(this.assignToMilestoneButton).click();
    return new AssignToMilestoneModal();
  }
}

export default TestRunCardSettings;
