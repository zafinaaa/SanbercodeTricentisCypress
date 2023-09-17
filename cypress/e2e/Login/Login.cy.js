import loginObjects from "../../support/pageObjects/loginObjects"
import landingPageObjects from "../../support/pageObjects/landingPageObjects"
const messages = require ("../../fixtures/messages.json")
describe('Verify login Page', () => {
  const LoginObject = new loginObjects
  const LandingPageObjects = new landingPageObjects  
  beforeEach(() => {
    cy.visit('/')
    cy.goToLoginPage(LoginObject.loginTxtBtn)
  })

  it('TC1 Login with valid email & password', () => {
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
    cy.fixture('users.json')
    .then((users) => {
    const datauser = users[1];
    cy.inputData(datauser.username, datauser.password)
    cy.get(LoginObject.BtnLogin).click()
    cy.get(LoginObject.invalidLoginMsg).should('contain.text', messageValidation.invalidLoginMsg)
    })
  })

  it('TC 03 Login with empty email & password', () => {
    cy.get(LoginObject.BtnLogin).click()
    cy.get(LoginObject.invalidLoginMsg).should('contain.text', messageValidation.invalidLoginMsg)
    })
  })


