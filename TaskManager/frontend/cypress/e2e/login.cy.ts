describe("Login", () => {
    it("logs in with any non-empty username/password (mock login)", () => {
      cy.visit("/login");
  
      cy.get('[data-cy="login-title"]').should("contain", "Login");
  
      cy.get('[data-cy="username"]').type("student");
      cy.get('[data-cy="password"]').type("password123");
  
      cy.get('[data-cy="submit-login"]').click();
  
      // One of these should be true after login.
      // Pick the assertion that matches your app behavior:
      // - URL changes (e.g., redirect to /)
      // - a logout button appears
      // - a protected page becomes visible
      // - a token is stored
      cy.url().should("not.include", "/login");
  
      // If your mock login stores something:
      // cy.window().its("localStorage").invoke("getItem", "token").should("be.a", "string");
    });
  
    it("shows an error if username/password are empty", () => {
      cy.visit("/login");
  
      cy.get('[data-cy="submit-login"]').click();
  
      // If you're using required + ngForm, browser validation may block submit.
      // If your submit() sets errorMessage, assert it:
      cy.get(".error").should("be.visible");
    });
  });