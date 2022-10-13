import { data } from "../../../fixtures/tenantConfig";
import { ProjectCard } from "./components/ProjectCard";

class ProjectsPage {
  constructor() {
    this.newProjectButtonLocator = ".zeb-page-subheader__actions > .gtm-project-button";
    this.projectCardsLocator = ".projects-table.ng-scope._extended > .projects-table__row";
  }

  visit() {
    cy.visit(data.baseUrl + "/projects", { failOnStatusCode: false });
  }

  assertPageOpened() {
    cy.get(this.newProjectButtonLocator).should("be.visible"); // Project's page is not opened
  }

  getProjectCardByKey(key) {
    cy.waitUntil(() => {
      cy.find(this.projectCardsLocator).each((projectCard) => {
        const projectCardObj = new ProjectCard(projectCard);
      });
    });
  }
}

export default ProjectsPage;
