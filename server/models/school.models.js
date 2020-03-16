const {model, Schema} = require('mongoose')

const schoolSchema = new Schema({
    school: {
        type: String,
    },
    adminId: {
        type: String,
    },
    level: {
        type: String,
    },
    group: {
        type: String,
    },
    student: {
        type: Array,
    },
    weekLesson: {
        type: Array
    },
    diary: {
        type: Object
    }
})

module.exports = model('school', schoolSchema)