const fs = require('fs')

const addStudent = (name) => {
    const existingStudents = loadStudents()

    const duplicatedStudent = existingStudents.find((name) => existingStudents.name === name)
    if (!duplicatedStudent) {
        existingStudents.push({
            name: name
        })
        save(existingStudents)
    } else {
        console.log('Student already exists')
    }

}

const save = (value) => {
    const dataJSON = JSON.stringify(value)
    fs.writeFileSync('students.json', dataJSON)
}

const loadStudents = () => {
    try {
        const dataBuffer = fs.readFileSync('students.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }

}
module.exports = { addStudent: addStudent }