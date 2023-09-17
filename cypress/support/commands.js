
Cypress.Commands.add('goToLoginPage', (locator) => {
    cy.get(locator).should('be.visible').click()
    cy.url().should('include', '/login')
})

Cypress.Commands.add('inputData', (username, password) => {
   cy.get('#Email').should('be.visible').type(username)
   cy.get('#Password').should('be.visible').type(password , { force: true })
})

Cypress.Commands.add('verifyMessage', (locator, message) => {
    cy.get(locator).should('be.visible').should('have.text', message)
 })

 Cypress.Commands.add('login', () => {
    cy.fixture('users.json')
    .then((users) => {
    const datauser = users[0];
    cy.get('.ico-login').click()
    cy.get('#Email').type(datauser.username)
    cy.get('#Password').type(datauser.password)
    cy.get('form > .buttons > .button-1').click()
    cy.url().should('include', '/')
    cy.get('.header-links > ul > :nth-child(1) > .account').should('have.text', datauser.username )
    })
 })

 Cypress.Commands.add('selectProducts', (product) => {
    cy.get(':nth-child(2) > .product-item > .picture > a > img').scrollIntoView() 
    cy.get(product).click()
})
