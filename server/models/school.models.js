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
        type: Schema.Types.ObjectId,
        ref: 'students'
    },
    lesson: {
        type: Schema.Types.ObjectId,
        ref: 'lessons'
    },
    diary: {
        type: Schema.Types.ObjectId,
        ref: 'diarys'
    }
})

module.exports = model('school', schoolSchema)