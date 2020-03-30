const {model, Schema} = require('mongoose')

const studentSchema = new Schema({
    student: {
        type: Array,
    }
})

module.exports = model('student', studentSchema)