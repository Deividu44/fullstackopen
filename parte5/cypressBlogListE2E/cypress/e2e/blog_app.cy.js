describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    const user = {
      name: 'Toad',
      username: 'toad22',
      password: '1234'
    }
    const user2 = {
      name: 'Donkey',
      username: 'donkey55',
      password: '1234'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)

    cy.visit('')
  })

  it('Login form is shown', () => {
    cy.contains('Log in').click()
    cy.contains('Login')
  })

  describe('Login', () => {
    it('succeeds with credentials', () => {
      cy.contains('Log in').click()
      cy.get('#username').type('toad22')
      cy.get('#password').type('1234')
      cy.get('#login-button').click()
  
      cy.contains('Welcome toad22')
    })

    it('fails with wrong credentials', () => {
      cy.contains('Log in').click()
      cy.get('#username').type('toad22')
      cy.get('#password').type('5678')
      cy.get('#login-button').click()

      cy.get('.messageError')
        .contains('Invalid username or password')
        .and('have.css', 'border', '3px solid rgb(255, 0, 0)')
    })

    describe('When logged in', () => {
      beforeEach(() => {
        cy.login({ username: 'toad22', password: '1234'})
      })

      it('A blog can be created', () => {
        cy.contains('New note').click()
        cy.get('#blog-title').type('Typing with Cypress')
        cy.get('#blog-author').type('Makulay')
        cy.get('#blog-url').type('https://www.google.com')
        cy.contains('Add Blog').click()
  
        cy.get('#blogs-container').find('p').as('newBlog')
        cy.get('@newBlog')
          .should('contain', 'Typing with Cypress')
      })
        
      describe('When blog is created', () => {
        beforeEach(() => {
          cy.createBlog({
            title: 'Attack to Backend by Cyress',
            author: 'Not Cypress',
            url: 'https://cypress.com'
          })
        })

        it('a blog can increment likes', () => {
          cy.contains('Attack to Backend by Cyress')
          cy.contains('show').click()
          cy.contains('👍').click()
          cy.contains('Likes: 1')
        })

        it('a blog can be deletes', () => {
          cy.contains('show').click()
          cy.contains('Delete').click()
          cy.contains('There are not blogs posted for the moment')
        })

        it('delete button only can see blog\'s user ', () => {
          cy.contains('Cancel').click()
          cy.contains('Logout').click()
          cy.login({ username: 'donkey55', password: '1234'})
          cy.createBlog({
            title: 'Another blog apparently interesting with Cypress',
            author: 'Not PlayWright',
            url: 'https://www.google.com'
          })
          cy.contains('Attack to Backend by Cyress Not Cypress').as('blog')
          cy.get('@blog').find('button').click()
          cy.get('@blog').parent().should('not.contain', 'Delete')            
        })
      })

      describe('when many blogs are created', () => {
        beforeEach(() => {
          cy.manyBlogs()
        })

        it('blogs sorted by number of likes', () => {
          cy.clickLikes('This blog will have more than 4 likes Not Playwright', 4)
          cy.clickLikes('Attack to Backend by Cyress Not Cypress', 1)
          cy.clickLikes('This blog will have 2 likes Not Playwright', 2)
          cy.get('[type="checkbox"]', {force: true}).click()

          cy.get('li').eq(0).should('contain', 'This blog will have more than 4 likes Not Playwright')
          cy.get('li').eq(1).should('contain', 'This blog will have 2 likes Not Playwright')
          cy.get('li').eq(2).should('contain', 'Attack to Backend by Cyress Not Cypress')
          cy.get('li').eq(3).should('contain', 'Another blog apparently interesting with Cypress Not PlayWright Not Playwright')
        })
      })
    })
  })
})