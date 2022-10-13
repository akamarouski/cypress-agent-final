import CustomVariableAddingForm from "./edit-launcher-components/CustomVariableAddingForm";

class AddOrEditLauncherPage {
  constructor() {
    this.launcherNameInput = "//input[@name='launcherName']";
    this.branchInput = "//md-input-container[contains(@class,'selected-launcher__input-container _branch')]//div[@name='repoBranch']//span[@role='button']";
    this.branchList = "//span[@class='selected-launcher__select-list-item ng-binding ng-scope']";
    this.dockerImageInput = "//autocomplete-input[@input-name='dockerImage']//md-input-container//md-autocomplete[@md-input-name='dockerImage']//input";
    this.dockerImageList = "//md-autocomplete-parent-scope[@md-autocomplete-replace='']/span";
    this.launchCommandInput = "//input[@name='launchCommand']";
    this.addVariableButton = "//button[@class='selected-launcher__button _add']//span[text()='Add variable']";
    this.variablesList = "//div[@ng-form='customVarsForm']";
    this.addCapabilityButton = "//button[@class='selected-launcher__button _add']//span[text()='Add capability']";
    this.addButton = "//button[contains(text(),'ADD')]";
    this.deleteLauncher = "//span[contains(text(),'Delete launcher')]/ancestor::button";
    this.cancelButton = "//button[contains(text(),'Cancel')]";
    this.selectedTestingPlatform = "//section[@class='selected-launcher__section _testing-platform']//span[@class='dropdown-with-icon__button-text ng-binding ng-scope']";
    this.testingPlatformsList = "//span[@class='dropdown-with-icon__item-text ng-binding ng-scope']";
    this.operationSystem = "//input[@name='platformCapability']";
    this.browserInput = "//input[@name='browserCapability']";
  }

  assertOpened() {
    cy.xpath(this.launcherNameInput).should("be.visible");
  }

  chooseBranchByName(branchName) {
    cy.wait(1000);
    cy.xpath(this.branchInput).click({ force: true });
    cy.wait(1000);
    cy.xpath(this.branchList).then((foundBranches) => {
      const count = foundBranches.length;
      let isClicked = false;

      for (let i = 0; i < count; i++) {
        if (foundBranches[i].innerText == branchName) {
          foundBranches[i].click();
          isClicked = true;
        }
      }
      if (!isClicked) {
        assert.fail("There are no branch with name: " + branchName);
      }
    });
    return this;
  }

  fillLauncherName(launcherName) {
    cy.wait(1000);
    cy.xpath(this.launcherNameInput).click({ force: true });
    cy.wait(1000);
    cy.xpath(this.launcherNameInput).type(launcherName, { force: true });
    cy.wait(1000);
    return this;
  }

  createNewEnvironmentVariable(name, type, defaultValue) {
    cy.wait(1000);
    cy.xpath(this.addVariableButton).click({ force: true });
    cy.wait(1000);
    const variable = this.variablesList;
    const customVariableAddingForm = new CustomVariableAddingForm(variable);
    customVariableAddingForm.typeVariableName(name);
    cy.wait(1000);
    customVariableAddingForm.typeDefaultValue(defaultValue);
    return this;
  }

  chooseDockerImage(dockerImageName) {
    cy.wait(1000);
    cy.xpath(this.dockerImageInput).click({ force: true });
    cy.wait(1000);
    cy.xpath(this.dockerImageList).then((foundDockerImages) => {
      const count = foundDockerImages.length;
      let isClicked = false;

      for (let i = 0; i < count; i++) {
        if (foundDockerImages[i].innerText == dockerImageName) {
          foundDockerImages[i].click();
          isClicked = true;
        }
      }
      if (!isClicked) {
        assert.fail("There are no docker image with name: " + dockerImageName);
      }
    });

    return this;
  }

  fillLaunchCommand(command) {
    cy.wait(1000);
    cy.xpath(this.launchCommandInput).click({ force: true });
    cy.wait(1000);
    cy.xpath(this.launchCommandInput).type(command, { force: true, parseSpecialCharSequences: false });
    return this;
  }

  acceptLauncherAdding() {
    cy.wait(1000);
    cy.xpath(this.addButton).click({ force: true });
  }
}

export default AddOrEditLauncherPage;
