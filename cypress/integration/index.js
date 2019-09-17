describe('Index page', () => {
  beforeEach(() => {
    cy.log(`Visiting http://localhost:3000`)
    cy.visit('/')
  })

  it('should match index page snapshot', () => {
    cy.get('#__next').toMatchImageSnapshot()
  })

  it('should render logo icon', () => {
    cy.get('a[href="/"] > img').should('have.length', 1)
  })
})
