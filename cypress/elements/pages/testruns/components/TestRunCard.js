import TestRunCardSettings from "./TestRunCardSettings";

class TestRunCard {
  constructor() {
    this.mainElement = "//div[@class='test-run-card ng-scope ng-isolate-scope']";
    this.titleLabel = "//span[@class='test-run-card__title-text ng-binding']";
    this.testSettings = "//button[@name='testRunSetting']";
    this.milestoneLabel = "//text-label[contains(@class,'test-run-card__milestone')]//span";
  }

  assertMilestoneLabelExists() {
    cy.xpath(this.milestoneLabel).should('be.visible')
  }

  assertMilestoneText(milestoneName) {
    cy.xpath(this.milestoneLabel).should('have.text', milestoneName)
  }

  isTitleEquals(title) {
    const wrappedTestRunCard = cy.wrap(this.testRunCard);
    wrappedTestRunCard.xpath(this.titleLabel).contains(title);
  }

  getTitle() {
    let name = "";
    const wrappedTestRunCard = cy.wrap(this.testRunCard);
    wrappedTestRunCard.xpath(this.titleLabel).then((element) => {
      name = element.text();
    });
    return name;
  }

  openSettings() {
    cy.get('[name=testRunSetting]').click();

    return new TestRunCardSettings();
  }

  getMilestoneLabel() {
    const wrappedTestRunCard = cy.wrap(this.testRunCard);
    return wrappedTestRunCard.xpath(this.milestoneLabel);
  }

  getMilestoneInnerText() {
    const wrappedTestRunCard = cy.wrap(this.testRunCard);

    let name = "";
    wrappedTestRunCard.xpath(this.milestoneLabel).then((element) => {
      name = element.text();
    });
    return name;
  }
}

export default TestRunCard;
