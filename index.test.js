const { expect } = require('chai')

const { joinAndFormat } = require('./index')

describe('joinAndFormat()', () => {
    it('should return null if missing args', () => {
        const people = [{person: 'tom'}]
        const formatted1 = joinAndFormat(people)

        expect(formatted1).to.be.null

        const formatted2 = joinAndFormat()

        expect(formatted2).to.be.null
    })
})