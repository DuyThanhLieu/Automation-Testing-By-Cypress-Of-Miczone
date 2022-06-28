/// <reference types="cypress" />
 describe('Accountant RatracoSolutions', () => {  
    it ('Verify that user can login with valid username and password', () => {
        cy.visit('https://staging-internal.woka.io/choose-apps')
        cy.get('#loginEmailInput').type('toannguyen@ratracosolutions.com');
        cy.get('#loginPasswordInput').type('123456'); //delay 3s
        //delay 5s for waiting loading
       cy.get('#loginSubmit').click({ delay :5000});
       cy.get('.woka-chooseapps__app-logo').should('be.visible').click();
       cy.get('[data-testid="MenuIcon"] > path').click();
       cy.get('.MuiDrawer-modal > .MuiPaper-root > .box-1 > .css-1hdfbzc > .MuiList-root > :nth-child(4) > .MuiListItemButton-root > .MuiListItemText-root > .MuiTypography-root').click();
      cy.get('.css-1fyudqa').click({ position:'topLeft'});
            });
});
