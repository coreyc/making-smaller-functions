function joinAndFormat(people, financialAttributes) {
    if (!people || !financialAttributes) return null

    return people.map(person => {
        return {
            person,
            ageGroup: (person.age && person.age >= 50) ? '50 and above' : '49 and below',
            financialInfo: financialAttributes.find(attribute => person.zipCode === attribute.zipCode)
        }
    })
}

async function getLoanInfo() {
    const people = await callDb()
  
    const financialAttributes = await callHttp()
  
    return joinAndFormat(people, financialAttributes)
}

module.exports = {
    joinAndFormat,
    getLoanInfo
}