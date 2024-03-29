import { data } from "../../../fixtures/tenantConfig";
import { ProjectCard } from "./components/ProjectCard";

class ProjectsPage {
  constructor() {
    this.newProjectButtonLocator = "//button[text()='Projects']";
    this.projectCardsLocator = ".//div[@class='projects-table__row']";
  }

  visit() {
    cy.visit(data.baseUrl + "/projects", { failOnStatusCode: false });
  }

  assertPageOpened() {
    cy.xpath(this.newProjectButtonLocator,{timeout:50000}).first().should("be.visible"); // Project's page is not opened
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
