import ProjectsPage from "../ProjectsPage";
import CreateProjectModal from "./CreateProjectModal";

class ProjectsActionsMenu {
  constructor() {
    this.createProjectButton = "//*[text()='Create a Project']";
    this.viewAllProjectsButton = "//*[text()='View all Projects']";
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
