describe('Verify login Page', () => {
    beforeEach(() => {
      cy.visit('/')
    })
    it.only('TC1 User successfuly register', () => {
        cy.get('.ico-register').click()
        cy.get('#gender-female').click()
        cy.get('#FirstName').type('Zafina')
        cy.get('#LastName').type('Aisyah')
        
        cy.fixture('users.json')
        .then((users) => {
        const datauser = users[0];
        cy.get('#Email').type(datauser.username)
        cy.get('#Password').type(datauser.password)
        cy.get('#ConfirmPassword').type(datauser.password)
        cy.get('#register-button').click()

      })
    
      it('TC 02 Login with invalid email or password', () => {
    
      })
    
      it('TC 03 Login with empty email & password', () => {
        
      })
})
})