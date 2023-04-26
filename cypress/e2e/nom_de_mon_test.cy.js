/// <reference types="cypress" />

describe('inscription réussie', () => {
  it('effacer les cookies', () => {
    cy.clearCookies()
  })
  it('visite du site web', () => {
    cy.visit('https://www.backmarket.fr')
  })

  it('clique pour accepter les cookies', () => {
    cy.get('[data-qa="accept-cta"]').click()
  })
  it('clique sur icone utilisateur', () => {
    cy.get('[data-test="icon-avatar"]').click()
  })
  it('entre adresse email', () => {
    cy.get('#email').type('test@testeur2000.fr')
  })
})
