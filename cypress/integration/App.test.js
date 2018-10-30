const valid_user = 'user';
const bad_user = 'baduser';

describe('A user visits the App', () => {
  it('Visit the app and sees the login page', () => {
    cy.visit('http://localhost:3000');
    cy.get('.login');
  });

  describe('eters an invvalid users credentials', () => {
    it('enters an invalid username', () => {
      cy.get('.input-username')
        .type(bad_user)
        .should('have.value', bad_user);
    });

    it('enters an invalid pasword', () => {
      cy.get('.input-password')
        .type(bad_user)
        .should('have.value', bad_user);
    });

    it('clicks the submit btn without valid credentials', () => {
      cy.get('.btn-submit').click();
      cy.get('.error-div').contains('This user does not exist');
    });
  });

  describe('it inputs a valid users credentials', () => {
    it('enters a valid username', () => {
      cy.get('.input-username')
        .clear()
        .type(valid_user)
        .should('have.value', valid_user);
    });

    it('enters a valid pasword', () => {
      cy.get('.input-password')
        .clear()
        .type(valid_user)
        .should('have.value', valid_user);
    });

    it('clicks the submit button', () => {
      cy.get('.btn-submit').click();
      cy.get('.welcome-message').contains('Welcome Back');
    });
  });
});
