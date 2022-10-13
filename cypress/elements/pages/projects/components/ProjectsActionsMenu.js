import ProjectsPage from "../ProjectsPage";
import CreateProjectModal from "./CreateProjectModal";

class ProjectsActionsMenu {
  constructor() {
    this.createProjectButton = "//div[contains(@class,'md-select-menu-container project-settings__select')]//span[text()='Create a Project']";
    this.viewAllProjectsButton = "//div[@class='project-settings__button']";
  }

  createProject() {
    cy.xpath(this.createProjectButton).click();
    return new CreateProjectModal();
  }

  /**
   * To Projects page
   */
  clickViewAllProjects() {
    cy.get(this.viewAllProjectsButton).click();
    return new ProjectsPage();
  }
}

export default ProjectsActionsMenu;
