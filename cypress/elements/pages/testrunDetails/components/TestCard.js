class TestCard {
    constructor() {
        this.parentElement = "[test=testItem]";
        this.zephurIcon = "[name=zephyrLink]";
        this.tectRailIcon = "[name=testRailLink]";
        this.xrayRailIcon = "[name=xRayLink]"
    }

    clickZephurIcon() {
        cy.get(this.zephurIcon).click();
    }
    
    clickXrayIcon() {
        cy.get(this.xrayRailIcon).click();
    }

    clickTestRailIcon() {
        cy.get(this.tectRailIcon).click();
    }
}
export default TestCard;