class LabelModal {
    constructor() {
        this.modalTitle = 'a.label-modal__title-link'
        this.stepsContent = 'div.steps__table-row>div.steps__table-col._content';
        this.expectedResult = 'div.label-modal__item-result';
        this.expectedResults = 'div.steps__table-row>div.steps__table-col._expected'
    }


    assertStepPresent(stepDescription) {
        cy.get(this.stepsContent
            , { timeout: 10000 }).should(
                "contain", stepDescription);
    }

    assertTitle(title) {
        cy.get(this.modalTitle, { timeout: 20000 }).should(
            "contain", title);
    }

    assertExpectedResult(expectedResult) {
        cy.get(this.expectedResults, { timeout: 10000 }).should(
            "contain", expectedResult);
    }

}
export default LabelModal; 