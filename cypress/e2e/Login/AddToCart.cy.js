import productsObject from "../../support/pageObjects/productsObject"
import addToCartObjects from "../../support/pageObjects/addToCartObjects"

describe('Verify Register Page', () => {
    const ProductObject = new productsObject
    const AddToCartObjects = new addToCartObjects
      beforeEach(() => {
        cy.visit('/')
        cy.login()
      })
      it('TC1 User able to Add item to cart', () => {
        cy.fixture('users.json')
        .then((users) => {
        const datauser = users[0];
        cy.selectProducts(ProductObject.$25VirtualGiftCard)
        cy.get(ProductObject.currentItem).should('have.text', '$25 Virtual Gift Card', )
        cy.get(AddToCartObjects.recipientName).type(datauser.firstName)
        cy.get(AddToCartObjects.recipientEmail).type(datauser.username)
        cy.get(AddToCartObjects.addToCartBtN).click()
        cy.verifyMessage(AddToCartObjects.bannerMsg, 'The product has been added to your shopping cart')
        cy.get(AddToCartObjects.cartTxtBtn).click()
        cy.url().should('include','/cart')
        cy.get(AddToCartObjects.cartQty).should('have.text', '(1)')
        cy.get(AddToCartObjects.qtyTxtInput).clear()
        cy.get(AddToCartObjects.qtyTxtInput).type('0{enter}')
        })
    })
    it('TC2 User able to update qty item at cart', () => {
        cy.fixture('users.json')
        .then((users) => {
        const datauser = users[0]; 
        cy.selectProducts(ProductObject.$25VirtualGiftCard)
        cy.get(ProductObject.currentItem).should('have.text', '$25 Virtual Gift Card' )
        cy.get(AddToCartObjects.recipientName).type(datauser.firstName)
        cy.get(AddToCartObjects.recipientEmail).type(datauser.username)
        cy.get(AddToCartObjects.addToCartBtN).click()
        cy.get(AddToCartObjects.bannerMsg).should('be.visible').should('have.text', 'The product has been added to your shopping cart')
        cy.get(AddToCartObjects.cartTxtBtn).click()
        cy.url().should('include','/cart')
        cy.get(AddToCartObjects.cartQty).should('have.text', '(1)')
        cy.get(AddToCartObjects.qtyTxtInput).clear()
        cy.get(AddToCartObjects.qtyTxtInput).type('2')
        cy.get(AddToCartObjects.updateCartBtn).click()
        cy.get(AddToCartObjects.cartQty).should('have.text', '(2)')
        cy.get(AddToCartObjects.qtyTxtInput).clear()
        cy.get(AddToCartObjects.qtyTxtInput).type('0{enter}')
        })
    })
})