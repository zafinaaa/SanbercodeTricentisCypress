

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

 Cypress.Commands.add('register', () => {
   cy.get('.ico-register').click()
   cy.get('#gender-male').click().should('be.visible').should('be.checked')
   cy.get('#FirstName').type('Zafina')
   cy.get('#LastName').type('Aisyah')
   cy.get('#Email').type(`${Date.now()}@yopmail.com`)
   cy.fixture('users.json')
   .then((users) => {
   const datauser = users[0];
   cy.get('#Password').type(datauser.password)
   cy.get('#ConfirmPassword').type(datauser.password)
   cy.get('#register-button').click()
   cy.url().should('include', '/registerresult/1')
   cy.get('.page-body > .buttons > .button-1').click()
   })
})

 Cypress.Commands.add('selectProducts', (product) => {
    cy.get(':nth-child(2) > .product-item > .picture > a > img').scrollIntoView() 
    cy.get(product).click()
})

Cypress.Commands.add('addToCart', () => {
   cy.fixture('users.json')
   .then((users) => {
   const datauser = users[0];
   cy.get(':nth-child(2) > .product-item > .picture > a > img').scrollIntoView()
   cy.get(':nth-child(2) > .product-item > .details > .add-info > .buttons > .button-2').click()
   cy.get('.current-item').should('have.text', '$25 Virtual Gift Card', )
   cy.get('#giftcard_2_RecipientName').type(datauser.firstName)
   cy.get('#giftcard_2_RecipientEmail').type(datauser.username)
   cy.get('#add-to-cart-button-2').click()
   cy.verifyMessage('.content', 'The product has been added to your shopping cart')
   cy.get('.content > a').click()
   cy.url().should('include','/cart')
   cy.get('.cart-qty').should('have.text', '(1)')
   })
})