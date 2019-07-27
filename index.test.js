const deepEqualInAnyOrder = require('deep-equal-in-any-order')
const chai = require('chai')

const { joinAndFormat } = require('./index')

const { expect } = chai
chai.use(deepEqualInAnyOrder)

describe('joinAndFormat()', () => {
    it('should return null if missing args', () => {
        const people = [{person: 'tom'}]
        const formatted1 = joinAndFormat(people)

        expect(formatted1).to.be.null

        const formatted2 = joinAndFormat()

        expect(formatted2).to.be.null
    })

    it('should format correctly', () => {
        const people = [
            {person: 'Tom', age: 50, zipCode: 21345},
            {person: 'Jack', age: 40, zipCode: 31680}
        ]

        const financialAttributes = [
            {zipCode: 21345, attributes: {spending: 'high', creditScoreAvg: 750}},
            {zipCode: 31680, attributes: {spending: 'low', creditScoreAvg: 730}},
            {zipCode: 45560, attributes: {spending: 'high', creditScoreAvg: 600}}
        ]

        const formatted = joinAndFormat(people, financialAttributes)

        expect(formatted).to.deep.equal([{
            person: {person: 'Tom', age: 50, zipCode: 21345},
            ageGroup: '50 and above',
            financialInfo: {zipCode: 21345, attributes: {spending: 'high', creditScoreAvg: 750}}
        },
        {
            person: {person: 'Jack', age: 40, zipCode: 31680},
            ageGroup: '49 and below',
            financialInfo: {zipCode: 31680, attributes: {spending: 'low', creditScoreAvg: 730}}
        }])
    })

    it('should designate people as 50 and above', () => {
        const people = [
            {person: 'Tom', age: 50, zipCode: 21345}
        ]

        const financialAttributes = [
            {zipCode: 21345, attributes: {spending: 'high', creditScoreAvg: 750}}
        ]

        const formatted = joinAndFormat(people, financialAttributes)

        expect(formatted.pop().ageGroup).to.equal('50 and above')
    })

    it('should designate people as 49 and below', () => {
        const people = [
            {person: 'Tom', age: 49, zipCode: 21345}
        ]

        const financialAttributes = [
            {zipCode: 21345, attributes: {spending: 'high', creditScoreAvg: 750}}
        ]

        const formatted = joinAndFormat(people, financialAttributes)

        expect(formatted.pop().ageGroup).to.equal('49 and below')
    })
})