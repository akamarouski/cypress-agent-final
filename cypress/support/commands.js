// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
require("cypress-xpath");
require('@zebrunner/javascript-agent-cypress/lib/commands/commands');
import "cypress-localstorage-commands";

import "cypress-wait-until";

Cypress.Commands.add("findElement", (searchContext, locator) => {
  return cy.wrap(searchContext).find(locator);
});

Cypress.Commands.add("getText", (locator) => {
  return cy.get(locator).invoke("text");
});

Cypress.Commands.add("clearField", (locator) => {
  return cy.getElement(locator).clear();
});

Cypress.Commands.add("getElement", (locator) => {
  cy.waitUntil(() =>
    cy
      .get(locator)
      .should("be.visible")
      .then((element) => {
        return element;
      })
  );
});
