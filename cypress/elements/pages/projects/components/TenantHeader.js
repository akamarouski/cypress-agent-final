import ProjectsActionsMenu from "./ProjectsActionsMenu";

class TenantHeader {
  constructor() {
    this.projectsButton = "//div[@class='app-header__logo']/following-sibling::div[@class='app-header__project']";
  }

  openProjectsActionsMenu() {
    cy.xpath(this.projectsButton).click();
    return new ProjectsActionsMenu();
  }
}
export default TenantHeader;
