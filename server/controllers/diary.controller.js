const Diary = require('../models/diary.models')
const Lesson = require('../models/lesson.models')
const User = require('../models/user.models')
const Student = require('../models/student.models')

module.exports.fetchDiary = async (req, res) => {
    try {
        if (req.session.user.diary) {
        const diaryFetch = await Diary.findById(req.session.user.diary)
        const diary = diaryFetch.diary[req.params.week]
        const user = await User.findById(req.session.user.user)
        const studentFetch = await Student.findById(req.session.user.student)
        const student = studentFetch.student.filter(s => s.id === String(req.session.user.user))
        res.json({diary, user, student})
        } else {
            res.json({diary: null})
        }
    } catch (e) {
        console.log(e)
        res.status(500).json(e)
    }
}

module.exports.lesson = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.session.user.lesson)
        res.json(lesson.lesson)
    } catch (e) {
        console.log(e)
        res.status(500).json(e)
    }
}

module.exports.save = async (req, res) => {
    try {
        const updateObj = {}
        updateObj["diary."+req.body.date] = req.body.diary
        const diary = await Diary.updateOne({_id: req.session.user.diary}, {$set: updateObj})
        res.json({message: 'Дневник сохранен'})
    } catch (e) {
        console.log(e)
        res.status(500).json(e)
    }
}