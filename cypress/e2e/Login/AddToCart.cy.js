import productsObject from "../../support/pageObjects/productsObject"
import addToCartObjects from "../../support/pageObjects/addToCartObjects"

describe('Verify Register Page', () => {
    const ProductObject = new productsObject
    const AddToCartObjects = new addToCartObjects
      beforeEach(() => {
        cy.visit('/')
        
      })
      it('TC1 User able to Add item to cart', () => {
        cy.login()
        cy.fixture('users.json')
        .then((users) => {
        const datauser = users[0];
        //cy.get(':nth-child(2) > .product-item > .picture > a > img').scrollIntoView() 
        cy.selectProducts(ProductObject.$25VirtualGiftCard)
        cy.get(ProductObject.currentItem).should('have.text', '$25 Virtual Gift Card', )
        cy.get('#giftcard_2_RecipientName').type(datauser.firstName)
        cy.get('#giftcard_2_RecipientEmail').type(datauser.username)
        cy.get('#add-to-cart-button-2').click()
        cy.get('.content').should('be.visible').should('have.text', 'The product has been added to your shopping cart')
        cy.get('.content > a').click()
        cy.get('.cart-qty').should('have.text', '(1)')
        cy.url().should('include','/cart')
        cy.get('.qty-input').clear()
        cy.get('.qty-input').type('0{enter}')
        //cy.get('.update-cart-button').click()
        })
    })
    it('TC2 User able to Add update cart', () => {
        cy.login()
        cy.fixture('users.json')
        .then((users) => {
        const datauser = users[0];
        //cy.get(':nth-child(2) > .product-item > .picture > a > img').scrollIntoView() 
        cy.selectProducts(ProductObject.$25VirtualGiftCard)
        cy.get(ProductObject.currentItem).should('have.text', '$25 Virtual Gift Card', )
        cy.get(AddToCartObjects.recipientName).type(datauser.firstName)
        cy.get(AddToCartObjects.recipientEmail).type(datauser.username)
        cy.get(AddToCartObjects.addToCartBtN).click()
        cy.get(AddToCartObjects.bannerMsg).should('be.visible').should('have.text', 'The product has been added to your shopping cart')
        cy.get(AddToCartObjects.cartTxtBtn).click()
        cy.url().should('include','/cart')
        cy.get(AddToCartObjects.cartQty).should('have.text', '(1)')
        cy.get('.qty-input').clear()
        cy.get('.qty-input').type('2')
        cy.get('.update-cart-button').click()
        cy.get('.cart-qty').should('have.text', '(2)')
        })
    })
})