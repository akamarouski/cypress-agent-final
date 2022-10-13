const untilAsync = async (fn, page, testRunCards) => {
  const time = 2000;
  const wait = 30000;
  const startTime = new Date().getTime();
  for (; ;) {
    try {
      const result = await fn(page, testRunCards);
      if (result != null) {
        return result;
      }
    } catch (e) {
      expect(false, "Somethig went wrong").to.be.true;
    }

    if (new Date().getTime() - startTime > wait) {
      expect(false, "Max wait reached").to.be.true;
    } else {
      await new Promise((resolve) => setTimeout(resolve, time));
    }
  }
};

class AssignToMilestoneModal {
  constructor() {
    this.mainElement = ".milestone-modal"
    this.titleLabel = "//h2[contains(@class,'modal-header__title')]";
    this.assignButton = "//span[@class='ng-scope' and text()='assign']//parent::button";
    this.milestones = "//div[contains(@class, 'header__radio-group-item-wrapper')]";
    this.checkbox = '.md-container'
  }

  isMilestonePresent(milestoneName) {
    cy.xpath(this.milestones).then((foundMilestones) => {
      const count = foundMilestones.length;
      let isPresent = false;

      for (let i = 0; i < count; i++) {
        if (foundMilestones[i].innerText == milestoneName) {
          isPresent = true;
        }
      }
      if (!isPresent) {
        assert.fail("There are no milestone with name: " + milestoneName);
      }
    });
    return this;
  }

  chooseMilestoneByName(milestoneName) {
    const findedMilestone = (async () => {
      await untilAsync((milestones) => {
        cy.xpath(milestones).then((foundMilestones) => {
          const count = foundMilestones.length;

          for (let i = 0; i < count; i++) {
            const wrappedMilestone = cy.wrap(foundMilestones[i]);
            let text = "";
            wrappedMilestone.xpath("//div[@class='md-label']").then((element) => {
              text = element.text();
            });

            if (text.trim() == milestoneName) {
              return wrappedMilestone;
            } else {
              return null;
            }
          }
          return null;
        });
      }, this.milestones);
    })();
    findedMilestone.click();
    return this;
  }

  accept() {
    cy.get(this.mainElement).find(this.assignButton).click();
  }

  selectMilestone(milestoneName) {
    cy.get(this.mainElement)
      .contains(milestoneName)
      .parent()
      .find(this.checkbox, { timeout: 5000 })
      .click()
    return this;
  }
}

export default AssignToMilestoneModal;
