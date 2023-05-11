/// <reference types="cypress-mailslurp" />

import { faker } from "@faker-js/faker";
const registerdPassword = faker.internet.password(15, false, /[a-zA-Z0-9]/);
const newPassword = faker.internet.password(15, false, /[a-zA-Z0-9]/);

let emailAddress;
let inboxId;
//const resetPasswordUrlRegex = /https:\/\/.*\/clicks.backmarket.com.*/;

describe("basic usage", function () {
  it("can load the plugin", async function () {
    // test we can connect to mailslurp
    const mailslurp = await cy.mailslurp();
    const userInfo = await mailslurp.userController.getUserInfo();
    expect(userInfo.id).to.exist;
  });
});
describe("création d'une nouvelle adresse email", function () {
  before(function () {
    return cy
      .mailslurp()
      .then((mailslurp) => mailslurp.createInbox())
      .then((inbox) => {
        // save inbox id and email address to this (make sure you use function and not arrow syntax)
        cy.wrap(inbox.id).as("inboxId");
        cy.wrap(inbox.emailAddress).as("emailAddress");
      });
  });
  it("stockage dans des variables", function () {
    // get wrapped email address and assert contains a mailslurp email address
    expect(this.emailAddress).to.contain("@mailslurp");
    emailAddress = this.emailAddress;
    inboxId = this.inboxId;
  });
});

describe("inscription avec une addresse mailslurp", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.visit("https://preprod.backmarket.fr/fr-fr/register");
  });
  it("remplissage correct du formulaire et soumission", () => {
    cy.get('[data-qa="accept-cta"]').click();
    cy.get("#firstName").type(faker.name.firstName());
    cy.get("#lastName").type(faker.name.lastName());
    cy.get("#signup-email").type(emailAddress);
    cy.get("#signup-password").type(registerdPassword);
    cy.get('[data-qa="signup-submit-button"]').click();
    cy.wait(5000);
    cy.url().then((actualUrl) => {
      expect(actualUrl).to.include("/dashboard");
    });
  });
});
describe("mot de passe oublie", function () {
  beforeEach(function () {
    cy.clearCookies();
    cy.visit("https://preprod.backmarket.fr/fr-fr/register");
    cy.get('[data-qa="accept-cta"]').click();
  });
  it("demande de reinitialisation mot de passe", function () {
    cy.get("form > :nth-child(3) > .cK_xUFG6").click();
    cy.get("#email").type(emailAddress);
    cy.get('[data-test="password-reset-submit-button"]').click();
    cy.mailslurp().then((mailslurp) =>
      mailslurp.waitForLatestEmail(inboxId).then((email) => {
        cy.document().invoke("write", email.body);
      })
    );
    cy.get(".t_pt20px > a").click();
    cy.get("#newPassword").type(newPassword);
    cy.get("#newPasswordConfirmation").type(newPassword);
    cy.get("._1xMx-RYw").click();
  });
  it("connexion avec nouveau mot de passe", () => {
    cy.get("#signin-email").type(emailAddress);
    cy.get("#signin-password").type(newPassword);
    cy.get('[data-qa="signin-submit-button"]').click()
    cy.wait(5000);
    cy.url().then((actualUrl) => {
      expect(actualUrl).to.include("/dashboard");
    });
  });
});
