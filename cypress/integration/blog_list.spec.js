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

  describe('When logged in', () => {
    beforeEach(function () {
      cy.login({
        username: 'Cypress',
        password: 'sypressia',
      })
    })

    it('a blog can be created', function () {
      cy.get('div').contains('New note').click()

      cy.get('#title').type('Cypress is the best!')
      cy.get('#author').type('Sypressi Sypressia')
      cy.get('#url').type('www.cypress.io')
      cy.get('#create-button').click()

      cy.get('.notification').should(
        'contain.text',
        'A new blog Cypress is the best! by Sypressi Sypressia added!'
      )
      cy.get('.blog')
        .should('contain.text', 'Cypress is the best! Sypressi Sypressia')
        .and('contain.text', 'View')
    })

    describe('When there are blogs', () => {
      beforeEach(function () {
        cy.newBlog({
          author: 'Backend Cypress',
          url: 'www.cypress.io',
          likes: 0,
          title: 'Cypress is the best straight to the backend!',
        })
        cy.newBlog({
          author: 'Backend Cypressia',
          url: 'www.cypress.io',
          likes: 0,
          title: 'Automation Magic from Cypress!',
        })
        cy.newBlog({
          author: 'Backend Cypressio',
          url: 'www.cypress.io',
          likes: 0,
          title: 'The magical journey of automation',
        })

        cy.visit('http://localhost:3000')
      })

      it('A blog can be liked', function () {
        cy.get('#view-button').click()
        cy.get('#like-button').click()

        cy.get('.blog').should('contain.text', 'Likes: 1')
      })

      it('A blog can be deleted', function () {
        cy.get('#view-button').click()
        cy.get('#remove-button').click()

        cy.get('html').should(
          'not.contain.text',
          'Cypress is the best straight to the backend! Backend Cypress'
        )

        cy.get('.notification').should(
          'contain.text',
          'Cypress is the best straight to the backend! by Backend Cypress deleted successfully!'
        )
      })

      describe('When a new user is added to the game', () => {
        beforeEach(function () {
          cy.request('POST', 'http://localhost:3001/api/users', {
            username: 'user2',
            password: 'pass2',
            name: 'Testi Kakkonen',
          })

          cy.login({
            username: 'user2',
            password: 'pass2',
          })
        })

        it('A blog created by another user cannot be deleted', function () {
          cy.get('#view-button').click()

          cy.get('#remove-button').should('not.exist')
        })
      })
    })
  })
})
