/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 * 文档地址: https://on.cypress.io/api
 */

describe('My First Test', () => {
  it('visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'Hello, Home page!')
    cy.contains('request').click()
    cy.contains('20')
    cy.contains('test').click()
    cy.contains('h1', 'Hello, Test page!')
    cy.contains('test').click()
  })
})
