/// <reference types="cypress" />
 describe('Demo test login ', () => {  
    it ('Verify that user can login with valid username and password', () => {
        cy.visit('https://staging-internal.woka.io/choose-apps')
        cy.get('#loginEmailInput').type('duythanhlieu2001@gmail.com');
        cy.get('#loginPasswordInput').type('123456'); //delay 3s
        //delay 5s for waiting loading
       cy.get('#loginSubmit').click({ delay :5000});
       cy.get('.woka-chooseapps__app-logo').should('be.visible').click();

    });
});