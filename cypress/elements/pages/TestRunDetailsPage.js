import LabelModal from "./testrunDetails/components/LabelModal";
import TestCard from "./testrunDetails/components/TestCard";

class TestRunDetailsPage {
  constructor() {
    this.titleLabel = "//h1[@class='zeb-page-header__title ng-binding']";
    this.testCards = "//test-card[@test='testItem']";
  }

  getTestRunCardByName(cardName) {
    return cy.xpath(this.testCards, { timeout: 5000 })
      .contains(cardName)
      .parents("[test=testItem]")
  }

  clickZephurIconOnTestCard(cardName) {
    this.getTestRunCardByName(cardName).within((card) => {
      new TestCard().clickZephurIcon()
    })
    return new LabelModal();
  }

  clickXrayIconOnTestCard(cardName) {
    this.getTestRunCardByName(cardName).within((card) => {
      new TestCard().clickXrayIcon()
    })
    return new LabelModal();
  }

  clickTestRailIconOnTestCard(cardName) {
    this.getTestRunCardByName(cardName).within((card) => {
      new TestCard().clickTestRailIcon()
    })
    return new LabelModal();
  }
}

export default TestRunDetailsPage;
