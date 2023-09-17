import checkoutObjects from "../../support/pageObjects/checkoutObjects"
const messages = require ("../../fixtures/messages.json")

describe('Verify add to cart scenarios', () => {
    const CheckoutObjects = new checkoutObjects
      beforeEach(() => {
        cy.visit('/')
        cy.register()
        
    })
    it('TC1 User able to Add item to cart', () => {
        cy.addToCart()
        cy.get(CheckoutObjects.termOfServiceCheckBox).click()
        cy.get(CheckoutObjects.checkoutBtn).click()
        cy.url().should('include','/onepagecheckout')
        cy.get(CheckoutObjects.countryBillingAddress).select('United States')
        cy.get(CheckoutObjects.stateBillingAddress).select('California')
        cy.get(CheckoutObjects.cityBillingAddress).type('California')
        cy.get(CheckoutObjects.address1BillingAddress).type('California Street No. 9')
        cy.get(CheckoutObjects.zipCodeBillingAddress).type('88471')
        cy.get(CheckoutObjects.phoneNoBillingAddress).type('0101551485')
        cy.get(CheckoutObjects.continueBtn, { timeout: 25000 }).click()
        cy.get(CheckoutObjects.CCPaymentMethod, { timeout: 25000}).should('be.visible').click()
        cy.get(CheckoutObjects.continueBtn2, { timeout: 25000}).should('be.visible').click()
        cy.get(CheckoutObjects.CCType).select('Visa')
        cy.get(CheckoutObjects.cardholderNameTxt).type('Zafina')
        cy.get(CheckoutObjects.cardNumberTxt).type('4111 1111 1111 1111')
        cy.get(CheckoutObjects.expireMonth).select('02')
        cy.get(CheckoutObjects.expireYear).select('2025')
        cy.get(CheckoutObjects.cardCode).type('523')
        cy.get(CheckoutObjects.continueBtn3, { timeout: 25000 }).click()
        cy.get(CheckoutObjects.productNameLabel).should('have.text', '$25 Virtual Gift Card' )
        cy.get(CheckoutObjects.confirmBtn).click()
        cy.url().should('include', '/checkout/completed/')
        cy.get(CheckoutObjects.orderSuccessfulLabel).should('have.text', messages.orderSuccessfulMsg)
        cy.get(CheckoutObjects.detailsOrderTxtBtn).click()
        cy.url().should('include', '/orderdetails')
    })
})