import ConcreteLauncherPage from "./ConcreteLauncherPage";

class LaunchersPage {
  constructor() {
    this.repositoryBtn = "//span[contains(text(),'Repository')]//ancestor::button";
    this.launchers = "//div[contains(@class,'launcher-tree__item-launcher-name ng-binding')]";
    this.repositories = "//div[contains(@class,'launcher-tree__repo-name ng-binding')]";
    this.addNewLauncherButton = "//button[@class='launcher-tree__item-new-launcher ng-scope']";
  }

  assertOpened() {
    cy.xpath(this.repositoryBtn).should("be.visible" , { timeout: 15000 });
  }

  assertLauncherPresent(launcherName) {
    cy.xpath(this.launchers).then((foundLaunchers) => {
      const count = foundLaunchers.length;
      let isPresent = false;

      for (let i = 0; i < count; i++) {
        if (foundLaunchers[i].innerText == launcherName) {
          isPresent = true;
        }
      }
      if (!isPresent) {
        assert.fail("There are no launcher with name: " + launcherName);
      }
    });
    return this;
  }

  chooseRepoByName(repoName) {
    cy.xpath(this.repositories).then((foundRepositories) => {
      const count = foundRepositories.length;
      let isClicked = false;

      for (let i = 0; i < count; i++) {
        if (foundRepositories[i].innerText == repoName) {
          foundRepositories[i].click();
          isClicked = true;
        }
      }
      if (!isClicked) {
        assert.fail("There are no repo with name: " + repoName);
      }
    });
    return this;
  }

  chooseLauncherByName(launcherName) {
    cy.xpath(this.launchers).then((foundLaunchers) => {
      const count = foundLaunchers.length;
      let isClicked = false;

      for (let i = 0; i < count; i++) {
        if (foundLaunchers[i].innerText == launcherName) {
          cy.wrap(foundLaunchers[i]).click();
          isClicked = true;
        }
      }
      if (!isClicked) {
        assert.fail("There are no launcher with name: " + repoName);
      }
    });

    return new ConcreteLauncherPage();
  }

  openNewLauncherAdding() {
    cy.xpath(this.addNewLauncherButton).click();
  }

  //    isLauncherPresent(launcherName) {
  //     let resultLaunchers = [];
  //     for (let i = 0; i < ( this.launchers.count()); ++i) {
  //       resultLaunchers.push(this.launchers.nth(i));
  //     }

  //     let findedLauncher;

  //     for (let i = 0; i < resultLaunchers.length; ++i) {
  //       const launcherInnerText = await resultLaunchers[i].innerText();
  //       if ((await launcherInnerText) == launcherName) {
  //         findedLauncher = resultLaunchers[i];
  //       }
  //     }
  //     return findedLauncher;
  //   }
}

export default LaunchersPage;
