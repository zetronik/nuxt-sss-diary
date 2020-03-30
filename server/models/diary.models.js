const {model, Schema} = require('mongoose')
const {diary} = require('../js/Diary')

const diarySchema = new Schema({
    diary: {
        type: Object,
        required: true,
        default: diary()
    }
})

module.exports = model('diary', diarySchema)