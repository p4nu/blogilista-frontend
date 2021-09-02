Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogListAppUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('newBlog', ({ author, url, likes, title }) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/api/blogs',
    auth: {
      bearer: JSON.parse(localStorage.getItem('loggedBlogListAppUser')).token,
    },
    body: {
      author,
      url,
      likes,
      title,
    },
  })
})
