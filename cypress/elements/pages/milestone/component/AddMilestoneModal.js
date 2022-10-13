class AddMilestoneModal {
  constructor() {
    this.calendar = "//md-calendar/div";
    this.milestoneModal = "//md-dialog";
    this.titleLabel = "//h2[@class='modal-header__title ng-binding']";
    this.closeDialogButton = "//md-icon[@aria-label='Close dialog']//ancestor::button";
    this.milestoneNameInput = "//*[@id='milestoneName']";
    this.startDateInput = "//label[text()='Start date']//following-sibling::md-datepicker";
    this.dueDateInput = "//label[text()='Due date']//following-sibling::md-datepicker";
    this.milestoneDesctiption = "//*[@id='milestoneDescription']";
    this.createButton = "//span[text()='create']//parent::button";
  }

  assertOpened() {
    cy.xpath(this.closeDialogButton).should("be.visible");
  }

  fillDescription(description) {
    cy.xpath(this.milestoneModal).xpath(this.milestoneDesctiption).type(description);
  }

  acceptMilestoneAdding() {
    cy.xpath(this.milestoneModal).xpath(this.createButton).click();
  }

  fillMilestoneTitle(title) {
    const milestoneModal = cy.xpath(this.milestoneModal);
    const milestoneInput = milestoneModal.xpath(this.milestoneNameInput);
    milestoneInput.type(title);
  }
}

export default AddMilestoneModal;
