/// <reference types="cypress" />
 describe('Demo test login ', () => {  
    it ('Verify that user can login with valid username and password', () => {
        cy.visit('https://staging-internal.woka.io/')
        cy.get('#loginEmailInput').type('toannguyen@ratracosolutions.com');
        cy.get('#loginPasswordInput').type('123456'); //delay 3s
        //delay 5s for waiting loading
       cy.get('#loginSubmit').click({ delay :5000});
       cy.get('.woka-chooseapps__app-logo').should('be.visible').click();
        cy.get('[data-testid="MenuIcon"] > path').click();
        cy.get('.MuiDrawer-modal > .MuiPaper-root > .box-1 > .css-1hdfbzc > .MuiList-root > :nth-child(2) > .MuiListItemButton-root > .MuiListItemText-root > .MuiTypography-root')
        .click();
    });
});