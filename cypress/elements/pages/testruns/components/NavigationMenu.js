import DashboardPage from "../../dashboard/DashboardPage";
import IntegrationsPage from "../../integration/IntegrationsPage";
import MilestonePage from "../../milestone/MilestonePage";
import TestRunsPage from "../TestRunsPage";

class NavigationMenu {
  constructor() {
    this.todashboardPageButton = "//ul[@class='nav main-nav__list']//li[contains(@class,'nav-item dashboards')]";
    this.toTestRunsPageButton = "//ul[@class='nav main-nav__list']//li[contains(@class,'nav-item tests')]";
    this.toMilestonePageButton = "//ul[@class='nav main-nav__list']//li[contains(@class,'main-nav__list-item nav-item milestones')]";
    this.toIntegrationsPageButton = "//ul[@class='nav main-nav__list']//li[contains(@class,'nav-item integrations')]";
    this.toMembersPageButton = "//ul[@class='nav main-nav__list']//li[contains(@class,'nav-item users')]";
  }

  assertExists() {
    cy.xpath(this.toDashboardPage).should("be.visible");
  }

  toDashboardPage() {
    cy.xpath(this.todashboardPageButton).click();
    return new DashboardPage();
  }

  toTestRunsPage() {
    cy.xpath(this.toTestRunsPageButton).click();
    cy.wait(2000);
    return new TestRunsPage();
  }

  toMilestonePage() {
    cy.wait(2000);
    cy.xpath(this.toMilestonePageButton).click({force: true});
    cy.wait(2000);
    return new MilestonePage();
  }

  toIntegrationsPage() {
    cy.xpath(this.toIntegrationsPageButton).click();
    return new IntegrationsPage();
  }

  toMembersPage() {
    cy.xpath(this.toMembersPageButton).click();
  }
}

export default NavigationMenu;
