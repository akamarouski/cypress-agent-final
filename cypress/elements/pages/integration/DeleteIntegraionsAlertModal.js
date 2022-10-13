class DeleteIntegraionsAlertModal {
  constructor() {
    this.acceptDeletingButton = "//md-dialog[@aria-label='Add project']//*[text()='Delete']//parent::button";
  }

  acceptDeleting() {
    cy.xpath(this.acceptDeletingButton).click();
  }
}

export default DeleteIntegraionsAlertModal;
