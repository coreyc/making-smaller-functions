function joinAndFormat(people, financialAttributes) {
    if (!people || !financialAttributes) return null

    return people.map(person => {
        return {
            person,
            ageGroup: (person.age && person.age >= 50) ? '50 and up' : '49 and below',
            meta: financialAttributes.find(attribute => attribute.zip === person.zip)
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