it('Written with DeploySentinel Recorder', () => {
  // Load "https://demacia.vercel.app/"
  cy.visit('https://demacia.vercel.app/')

  // Resize window to 1366 x 657
  cy.viewport(1366, 657)

  // Scroll wheel by X:0, Y:400
  cy.scrollTo(0, 0)

  // Scroll wheel by X:0, Y:-100
  cy.scrollTo(0, 0)

  // Click on <input> [placeholder="Summoner name"]
  cy.get('[placeholder="Summoner name"]').click()

  // Fill "garen" on <input> [placeholder="Summoner name"]
  cy.get('[placeholder="Summoner name"]').type('garen')

  // Press Enter on input
  cy.get('[placeholder="Summoner name"]').type('{Enter}')

  // Scroll wheel by X:0, Y:1200
  cy.scrollTo(0, 0)

  // Click on <svg> .fixed > .text-gray-300
  cy.get('.fixed > .text-gray-300').click()

  // Click on <button> "Champions Mastery"
  cy.get('.px-3:nth-child(2)').click()

  // Click on <button> "Live Game"
  cy.get('.px-3:nth-child(3)').click()

  // Click on <a> "Champions"
  cy.get('[href="/champions"]').click()

  // Click on <a> "Marksman

  cy.get('[href="/champion-info/Akshan"]').click()

  // Scroll wheel by X:0, Y:2200
  cy.scrollTo(0, 0)

  // Click on <img> [alt="Crystal Rose Akshan"]
  cy.get('[alt="Crystal Rose Akshan"]').click()

  // Click on <img> [alt="Cyber Pop Akshan"]
  cy.get('[alt="Cyber Pop Akshan"]').click()

  // Click on <a> "Status"
  cy.get('[href="/status"]').click()

  // Scroll wheel by X:0, Y:300
  cy.scrollTo(0, 0)

  // Scroll wheel by X:0, Y:-200
  cy.scrollTo(0, 0)

  // Click on <span> "All Servers"
  cy.get('[data-testid="filter-span"]').click()

  // Click on <li> "EU West"
  cy.get('.p-2:nth-child(3)').click()

  // Scroll wheel by X:0, Y:-500
  cy.scrollTo(0, 0)

  // Click on <a> "Champion Rotations"
  cy.get('[href="/champion-rotations"]').click()

  // Click on <a> "Marksman

  cy.get('[href="/champion-info/Ezreal"]').click()

  // Scroll wheel by X:0, Y:2400
  cy.scrollTo(0, 0)

  // Click on <img> [alt="Nottingham Ezreal"]
  cy.get('[alt="Nottingham Ezreal"]').click()

  // Click on <img> [alt="Striker Ezreal"]
  cy.get('[alt="Striker Ezreal"]').click()

  // Click on <a> "Leaderboards"
  cy.get('[href="/leaderboards"]').click()

  // Scroll wheel by X:0, Y:300
  cy.scrollTo(0, 0)

  // Scroll wheel by X:0, Y:-400
  cy.scrollTo(0, 0)

  // Click on <a> "Featured Games"
  cy.get('[href="/featured-games"]').click()

  // Scroll wheel by X:0, Y:300
  cy.scrollTo(0, 0)

  // Click on <p> "POOPY PANTIES XD POOPY PA..."
  cy.get('.my-4:nth-child(5) > .flex > div:nth-child(1) .mb-1:nth-child(1) .truncate .truncate').click()

  // Click on <button> "Live Game"
  cy.get('.px-3:nth-child(3)').click()

  // Scroll wheel by X:0, Y:400
  cy.scrollTo(0, 0)

  // Scroll wheel by X:0, Y:-300
  cy.scrollTo(0, 0)

  // Scroll wheel by X:0, Y:500
  cy.scrollTo(0, 0)
})
