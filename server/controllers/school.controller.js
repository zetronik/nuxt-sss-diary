const jwt = require('jsonwebtoken')
const keys = require('../keys')
const School = require('../models/school.models')
const User = require('../models/user.models')
const Auth = require('../models/auth.models')
const {diary, lesson} = require('../js/Diary')

module.exports.createClass = async (req, res) => {
    try {
        const candidate = await School.findOne({adminId: req.session.user._id})
        if (candidate) {
            candidate.school = req.body.school
            await candidate.save()
            res.status(201).json({message: 'Изменения внесены'})
        } else {
            const school = new School({
                adminId: req.body.adminId,
                school: req.body.school,
                level: req.body.level,
                group: req.body.group,
                weekLesson: lesson,
                diary: diary ()
            })
            const token = req.cookies['token-session']
            const decoded = jwt.verify(token, keys.JWT);
            const auth = await Auth.findById(decoded.userId)
                auth.schoolId = school._id
            
            await school.save()
            await auth.save()
            res.status(201).json({message: 'Класс создан', id: school._id})
        }
    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports.serch = async (req, res) => {
    try {
        const {_id, school, group, level} = await School.findById(req.params.id)
        if (_id) {
            res.json({_id, school, group, level})
        }
    } catch (error) {
        res.status(500).json(e)
    }
}

module.exports.save = async (req, res) => {
    try {
        const candidate = await School.findById(req.params.id)
        if (candidate) {
            candidate.weekLesson = req.body
            await candidate.save()
            res.status(201).json({message: 'Расписание изменено'})
        }
    } catch (error) {
        res.status(500).json(e)
    }
}