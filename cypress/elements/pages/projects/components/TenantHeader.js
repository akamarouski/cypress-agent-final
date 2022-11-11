import ProjectsActionsMenu from "./ProjectsActionsMenu";

class TenantHeader {
  constructor() {
    this.projectsButton = "//*[@class='projects-dropdown']/button";
  }

  openProjectsActionsMenu() {
    cy.xpath(this.projectsButton).click( {timeout: 75000});
    return new ProjectsActionsMenu();
  }
}
export default TenantHeader;
