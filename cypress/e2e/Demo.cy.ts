describe('Full E2E test', () => {
  it('Written with DeploySentinel Recorder', () => {
  // Load "https://demacia.vercel.app/"
    cy.visit('https://demacia.vercel.app/')

    // Resize window to 1920 x 969
    cy.viewport(1920, 969)

    // Click on <input> [placeholder="Summoner name"]
    cy.get('[placeholder="Summoner name"]').click()

    // Fill "garen" on <input> [placeholder="Summoner name"]
    cy.get('[placeholder="Summoner name"]').type('garen')

    // Press Enter on input
    cy.get('[placeholder="Summoner name"]').type('{Enter}')

    // Click on <button> "Load More"
    cy.get('.n-button--info-type').click()

    // Click on <span> "Champion Mastery"
    cy.get('.n-button:nth-child(2) > .n-button__content').click()

    // Click on <span> "Live Game"
    cy.get('.n-button:nth-child(3) > .n-button__content').click()

    // Click on <a> "Champions"
    cy.get('[href="/champions"]').click()

    // Click on <input> [placeholder="Search"]
    cy.get('[placeholder="Search"]').click()

    // Fill "garen" on <input> [placeholder="Search"]
    cy.get('[placeholder="Search"]').type('garen')

    // Click on <svg> .n-base-icon > svg
    cy.get('.n-base-icon > svg').click()

    // Click on <span> "Fighter"
    cy.get('.n-button:nth-child(1) > .n-button__content').click()

    // Click on <span> "Fighter"
    cy.get('.n-button--primary-type > .n-button__content').click()

    // Click on <span> "Marksman"
    cy.get('.n-button:nth-child(2) > .n-button__content').click()

    // Click on <button> "Marksman"
    cy.get('.n-button--primary-type').click()

    // Click on <a> "Status"
    cy.get('[href="/status"]').click()

    cy.wait(2000)

    // Click on <span> "All Servers"
    cy.get('.n-button').click({ multiple: true })

    cy.wait(2000)

    // Click on <li> "EU West"
    cy.get('.p-2:nth-child(3)').click()
    cy.wait(1000)

    // Click on <a> "Champion Rotations"
    cy.get('[href="/champion-rotations"]').click()

    // Click on <a> "Leaderboards"
    cy.get('[href="/leaderboards"]').click()

    // Click on <div> "EUW"
    cy.get('[title="EUW"]').click()

    // Click on <div> "TR"
    cy.get('.n-base-select-option--pending > .n-base-select-option__content').click()

    // Click on <a> "Featured Games"
    cy.get('[href="/featured-games"]').click()

    // Click on <span> "EUW"
    cy.get('.n-button__content').click()

    // Click on <li> "JP"
    cy.get('.p-2:nth-child(10)').click()

    // Click on <p> "星を願う 星を願う"
    cy.get('.my-4:nth-child(2) > .flex > div:nth-child(2) .mb-1:nth-child(1) .truncate .truncate').click()

    // Click on <span> "Live Game"

    // Click on <a> "About"
    cy.get('[href="/about"]').click()
  })
})
