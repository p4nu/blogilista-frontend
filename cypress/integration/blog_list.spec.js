describe('The Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', {
      username: 'Cypress',
      name: 'Sypressi',
      password: 'sypressia',
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('Cypress')
      cy.get('#password').type('sypressia')
      cy.get('#login-button').click()

      cy.get('div').should('contain.text', 'Sypressi logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('Wrong')
      cy.get('#password').type('Credentials')
      cy.get('#login-button').click()

      cy.get('.notification').should('contain.text', 'wrong credentials')
    })
  })
})
