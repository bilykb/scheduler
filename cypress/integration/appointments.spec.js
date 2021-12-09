describe("Appointment", () => {

  beforeEach(() => {
    cy.request("GET", "/api/debug/reset"),
    cy.visit("/"),
    cy.contains("[data-testid=day]", "Monday")
  })

  it("should book an interview", () => {

    cy.get("[alt='Add']")
      .first()
      .click()
    cy.get("[data-testid=student-name-input]")
      .type("Brett Bilyk")
    cy.get("[alt='Sylvia Palmer']")
      .click()
    cy.contains("Save")
      .click()
    cy.contains(".appointment__card--show", "Brett Bilyk")
    cy.contains(".appointment__card--show", "Sylvia Palmer")
  });

  it("should edit an interview", () => {
    
    cy.get("[data-testid='show']")
    cy.get("[alt='Edit']")
      .click({force: true})
    cy.get("[data-testid=student-name-input]")
      .type("{selectall} {backspace} Brett Bilyk")
    cy.get("[alt='Tori Malcolm']")
      .click()
    cy.contains("Save")
      .click()
    cy.contains("[data-testid='show']", "Brett Bilyk")
    cy.contains("[data-testid='show']", "Tori Malcolm")
  })

  it("should delete an interview", () => {
    cy.contains("[data-testid='show']", "Archie Cohen")
    cy.get("[alt='Delete']")
      .click({force: true})
    cy.contains("Confirm")
      .click()
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
    cy.contains(".appointment__card--show", "Archie Cohen")
    .should("not.exist");
    cy.get("[data-testid='add']")
  })
})