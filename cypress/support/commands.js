
Cypress.Commands.add('goToLoginPage', (locator) => {
    cy.get(locator).should('be.visible').click()
    cy.url().should('include', '/login')
})

Cypress.Commands.add('inputData', (username, password) => {
   cy.get('#Email').should('be.visible').type(username)
   cy.get('#Password').should('be.visible').type(password , { force: true })
})