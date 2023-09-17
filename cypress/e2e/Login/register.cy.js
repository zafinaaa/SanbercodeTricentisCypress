import registerpage from "../../support/pageObjects/registerPage"
const messages = require ("../../fixtures/messages.json")

describe('Verify Register Page', () => {
  const RegisterPage = new registerpage
    beforeEach(() => {
      cy.visit('/')
      cy.get(RegisterPage.registerTxtBtn).click()
      cy.url().should('include', '/register')
    })
    it('TC1 User successfuly register', () => {
      /* comment 2 rows below if you want to select Male option */
      cy.get(RegisterPage.femaleOption).click()
      cy.get(RegisterPage.femaleOption).should('be.checked')
      

      /* comment 2 rows below if you want to select Female option */
      //cy.get(RegisterPage.maleOption).click()
      //cy.get(RegisterPage.maleOption).should('be.checked')
    
        cy.get(RegisterPage.firstNameTxt).type('Zafina')
        cy.get(RegisterPage.lastNameTxt).type('Aisyah')
        
        cy.fixture('users.json')
        .then((users) => {
        const datauser = users[0];
        cy.get(RegisterPage.emailTxt).type(`${Date.now()}@yopmail.com`)
        cy.get(RegisterPage.passwordTxt).type(datauser.password)
        cy.get(RegisterPage.confrimPasswordTxt).type(datauser.password)
        cy.get(RegisterPage.registerBtn).click()
        cy.url().should('include', '/registerresult/1')
        cy.get('.result').contains('Your registration completed')
      })
    })
    it('TC2 Invalid registration with empty fields', () =>{
      cy.get(RegisterPage.registerBtn).click()
      cy.verifyMessage(RegisterPage.firstNameRequiredLabel, messages.firstNameReqiredMsg)
      cy.verifyMessage(RegisterPage.lastNameRequiredLabel, messages.lasNameRequiredMsg)
      cy.verifyMessage(RegisterPage.emailRequiredLabel,messages.emailRequiredMsg)
      cy.verifyMessage(RegisterPage.passwordrequiredLabel, messages.passwordRequiredMsg)
      cy.verifyMessage(RegisterPage.confrimPasswordRequiredLabel, messages.passwordRequiredMsg)
    })

})
