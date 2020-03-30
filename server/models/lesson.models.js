const {model, Schema} = require('mongoose')
const {lesson} = require('../js/Diary')

const lessonSchema = new Schema({
    lesson: {
        type: Array,
        required: true,
        default: lesson
    }
})

module.exports = model('lesson', lessonSchema)