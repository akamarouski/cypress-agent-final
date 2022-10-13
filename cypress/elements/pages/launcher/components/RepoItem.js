class RepoItem {
  constructor(context) {
    this.context = context;
  }

  click() {
    this.context.xpath(this.repoItem).click();
  }

  getTitle() {
    const repoName = "";
    this.context.invoke("text").then((text) => {
      repoName = text;
    });
    return repoName;
  }
}
