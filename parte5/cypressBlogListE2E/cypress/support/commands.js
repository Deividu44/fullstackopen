// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
      username, password
    }).then(res => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(res.body))
    cy.visit('')
  })
}) 

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url: `${Cypress.env('BACKEND')}/blogs`,
    method: 'POST',
    body: { title, author, url },
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
    }
  })
  cy.visit('')
})

Cypress.Commands.add('manyBlogs', () => {
  cy.createBlog({
    title: 'Attack to Backend by Cyress',
    author: 'Not Cypress',
    url: 'https://cypress.com'
  })
  cy.createBlog({
    title: 'Another blog apparently interesting with Cypress Not PlayWright',
    author: 'Not Playwright',
    url: 'https://playwright.com'
  })
  cy.createBlog({
    title: 'This blog will have more than 4 likes',
    author: 'Not Playwright',
    url: 'https://playwright.com'
  })
  cy.createBlog({
    title: 'This blog will have 2 likes',
    author: 'Not Playwright',
    url: 'https://playwright.com'
  })
})

Cypress.Commands.add('clickLikes', (title, numLikes) => {
  cy.contains(title).as('blog')
  cy.get('@blog').find('button').click()
  for(let i = 0; i < numLikes; i++) {
    cy.get('@blog').parent().find('button').contains('👍').click()
  }
  cy.get('@blog').find('button').click()
})