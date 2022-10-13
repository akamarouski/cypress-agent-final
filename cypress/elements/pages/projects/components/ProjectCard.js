class ProjectCard {
  constructor(projectCard) {
    this.projectCard = projectCard;
    this.nameLabel = "//a[@class='projects-table__content _link ng-binding']";
    this.keyLabel = "//div[@class='projects-table__col _key']/span";
    this.editButton = "//md-icon[text()='edit']";
  }

  getName() {
    let name = "";
    this.projectCard.xpath(this.nameLabel).then((element) => {
      name = element.text();
    });
    return name;
  }

  getKey() {
    let name = "";
    this.projectCard.xpath(this.keyLabel).then((element) => {
      name = element.text();
    });
    return name;
  }

  edit() {
    this.projectCard.xpath(this.editButton).click();
  }
}

export default ProjectCard;
