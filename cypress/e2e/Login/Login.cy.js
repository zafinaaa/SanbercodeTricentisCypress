import loginObjects from "../../support/pageObjects/loginObjects"
import landingPageObjects from "../../support/pageObjects/landingPageObjects"

describe('Verify login Page', () => {
  const LoginObject = new loginObjects
  const LandingPageObjects = new landingPageObjects  
  beforeEach(() => {
    cy.visit('/')
  })

  it('TC1 Login with valid email & password', () => {
    cy.goToLoginPage('.ico-login')
    cy.fixture('users.json')
    .then((users) => {
    const datauser = users[0];
    cy.inputData(datauser.username, datauser.password)
    cy.get(LoginObject.BtnLogin).click()
    cy.url().should('include', '/')
    cy.get(LandingPageObjects.accountHeader).should('have.text', datauser.username )
    })
  })

  it('TC2 Login with invalid email or password', () => {
    cy.goToLoginPage('.ico-login')
    cy.fixture('users.json')
    .then((users) => {
    const datauser = users[1];
    cy.inputData(datauser.username, datauser.password)
    cy.get(LoginObject.BtnLogin).click()
    cy.get(LoginObject.invalidLoginMsg).should('contain.text', 'Login was unsuccessful. Please correct the errors and try again.')
    })
  })

  it('TC 03 Login with empty email & password', () => {
    cy.goToLoginPage('.ico-login')
    cy.get(LoginObject.BtnLogin).click()
    cy.get(LoginObject.invalidLoginMsg).should('contain.text', 'Login was unsuccessful. Please correct the errors and try again.')
    })
  })


