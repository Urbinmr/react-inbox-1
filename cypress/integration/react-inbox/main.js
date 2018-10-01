describe('test react inbox', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('star button changes when clicked', () => {
        cy.get('#star1').click().should('have.class', 'fa-star-o')
    })

    it('check box changes when clicked', () => {
        cy.get('#checkbox1').check().should('be.checked')
        cy.get('#checkbox2').uncheck().should('not.be.checked')
    })

    //Presupposes that some are already selected in initial state
    it('if some are checked, selectall selects...all...', () => {
        cy.get('#selectAllButton').click().then(() => {
            cy.get('input[type="checkbox"]').should('be.checked')
        })
    })

    it('if all are checked, all checkboxes become unchecked', () => {
        cy.get('#selectAllButton').click().click().then(() => {
            cy.get('input[type="checkbox"]').should('not.be.checked')
        })
    })

    //presupposes that messages 2 and 4 are selected; 2 is unread, 4 is read
    it('if message is selected, "mark as read" changes it to read state', () => {
        cy.get('#markAsReadButton').click().then(() => {
            cy.get('[data-test="message-row-2"]').should('have.class', 'read')
        })
    })

    it('if message is selected, "mark as unread" changes it to unread state', () => {
        cy.get('#markAsUnreadButton').click().then(() => {
            cy.get('[data-test="message-row-4"]').should('have.class', 'unread')
        })
    })

    it('should apply label to selected messages when label is clicked', () => {
        //test add personal label
        cy.get('#applyLabelDropdown').select('personal').then(() => {
            cy.get('[data-test="message-row-2"]').find('span').should('have.class', 'label label-warning personal')
        })

        //test add dev label
        cy.get('#applyLabelDropdown').select('dev').then(() => {
            cy.get('[data-test="message-row-4"]').find('span').should('have.class', 'label label-warning dev')
        })

        //test remove personal label
        cy.get('#removeLabelDropdown').select('personal').then(() => {
            cy.get('[data-test="message-row-2"]').find('span').should('not.have.class', 'label label-warning personal')
        })


        //test remove dev label
        cy.get('#removeLabelDropdown').select('dev').then(() => {
            cy.get('[data-test="message-row-4"]').find('span').should('not.have.class', 'label label-warning dev')
        })

    })

    it('deletes selected messages when delete is clicked', () => {
        cy.get('#deleteButton').click().then(() => {
            cy.get('.message').should('have.length', 6)
            cy.get('[data-test="message-row-4"]').should('not.exist')
        })
    })

})