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
                adminId: req.session.user._id,
                school: req.body.school,
                level: req.body.level,
                group: req.body.group,
                weekLesson: lesson,
                diary: diary ()
            })
            const auth = await Auth.findById(req.session.user._id)
            auth.schoolId = school._id
            req.session.user.schoolId = school._id
            await school.save()
            await auth.save()
            res.status(201).json({message: 'Класс создан', id: school._id})
        }
    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports.classDelete = async (req, res) => {
    try {
        await School.deleteOne({_id: req.session.user.schoolId})
        await Auth.where({_id: req.session.user._id}).updateOne({$unset: {schoolId: req.session.user.schoolId}})
        delete req.session.user.schoolId
        res.status(201).json({message: 'Класс удален'})
    } catch (e) {
        console.log(e)
        res.status(500).json(e)
    }
}

module.exports.schoolJoin = async (req, res) => {
    try {
        const findUser = await User.findById(req.session.user.user)
        const user = {
            id: String(findUser._id),
            name: findUser.name,
            surname: findUser.surname,
            access: false
        }
        const student = await School.findById(req.params.id)
        const find = student.student.filter(s => s.id === String(req.session.user.user))
        if (find.length > 0) {
            res.status(201).json({message: 'Вы уже присутствуете  классе'})
        } else {
            await School.findById(req.params.id).updateOne({$push: {student: user}})
            await Auth.findById(req.session.user._id).updateOne({$set: {schoolId: req.params.id}})
            req.session.user.schoolId = req.params.id
            res.status(201).json({message: 'Вы присоедененились к классу'})
        }
        
    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports.joinDelete = async (req, res) => {
    try {
        const s = await School.updateOne({_id: req.session.user.schoolId}, {$pull: {student: {id: String(req.session.user.user)}}})
        await Auth.where({_id: req.session.user._id}).updateOne({$unset: {schoolId: req.session.user.schoolId}})
        delete req.session.user.schoolId
        res.status(201).json({message: 'Вы покинули класс'})
    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports.studentAccess = async (req, res) => {
    try {
        await School.updateOne({_id: req.session.user.schoolId, "student.id": req.body.id}, {$set: {"student.$.access": req.body.access}})
        res.status(201).json({id: req.body.id, access: req.body.access})
    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports.serch = async (req, res) => {
    try {
        const {_id, school, group, level} = await School.findById(req.params.id)
        if (_id) {
            res.json({_id, school, group, level})
        } else {
            res.json({message: 'Класс не найден или удален'})
        }
    } catch (e) {
        res.json({message: 'Класс не найден или удален', e})
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
    } catch (e) {
        res.status(500).json(e)
    }
}