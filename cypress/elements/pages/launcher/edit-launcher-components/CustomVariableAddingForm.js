class CustomVariableAddingForm {
  constructor(variableBlock) {
    this.variableBlock = variableBlock;
    this.nameInput = "//input[@name='variableName']";
    this.typeInput = "//*[@class='ui-select-match-text pull-left']";

    this.typesList = "//div[contains(@id, 'ui-select-choices-row')]";
    this.defaultValueInput = "//input[contains(@name, 'default') and contains(@name, 'Value')]";
  }

  typeVariableName(variableName) {
    cy.xpath(this.nameInput).click({force: true});
    cy.xpath(this.nameInput).type(variableName, {force: true});
    return this;
  }

  typeDefaultValue(defaultValue) {
    cy.xpath(this.defaultValueInput).click({force: true});
    cy.xpath(this.defaultValueInput).type(defaultValue, {force: true});
    return this;
  }

  selectType(typeName) {
    cy.xpath(this.typeInput).click({force: true});
    cy.xpath(this.typesList).then((foundTypes) => {
      const count = foundTypes.length;
      let isClicked = false;

      for (let i = 0; i < count; i++) {
        if (foundTypes[i].innerText == typeName) {
          foundTypes[i].click();
          isClicked = true;
        }
      }
      if (!isClicked) {
        assert.fail("There are no type with name: " + typeName);
      }
    });
    return this;
  }
}

export default CustomVariableAddingForm;
