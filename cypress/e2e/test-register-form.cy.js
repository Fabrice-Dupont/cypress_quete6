/// <reference types="cypress" />

describe('inscription réussie', () => {
  // it('effacer les cookies', () => {
  //   cy.clearCookies()
  // })
  it('visite du site web', () => {
    cy.visit('https://preprod.backmarket.fr/fr-fr/register')
  })

  it('entre un prénom', () => {
    cy.get('#firstName').type('Guy')
  })
  it('entre un nom', () => {
    cy.get('#lastName').type('Teub')
  })
  it('entre une adresse email', () => {
    cy.get('#signup-email').type('test@testeur2000.fr')
  })
  it('entre un mot de passe', () => {
    cy.get('#signup-password').type('123456Azerty@')
  })
  it('clique sur le bouton submit', () => {
    cy.get('[data-qa="signup-submit-button"]').click()
  })
})
describe('inscription échouée', () => {
  // it('effacer les cookies', () => {
  //   cy.clearCookies()
  // })
  it('visite du site web', () => {
    cy.visit('https://preprod.backmarket.fr/fr-fr/register')
  })

  it('entre un prénom', () => {
    cy.get('#firstName').type('Guy')
  })
  it('entre un nom', () => {
    cy.get('#lastName').type('Teub')
  })
  it('entre une adresse email', () => {
    cy.get('#signup-email').type('test@testeur2000.fr')
  })
  it('entre un mot de passe trop court', () => {
    cy.get('#signup-password').type('abcde')
  })
  it('clique sur le bouton submit', () => {
    cy.get('[data-qa="signup-submit-button"]').click()
  })
})
