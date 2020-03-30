const School = require('../models/school.models')
const User = require('../models/user.models')
const Auth = require('../models/auth.models')
const Lesson = require('../models/lesson.models')
const Diary = require('../models/diary.models')
const Student = require('../models/student.models')

module.exports.createClass = async (req, res) => {
    try {
        const candidate = await School.findOne({adminId: req.session.user._id})
        if (candidate) {
            candidate.school = req.body.school
            await candidate.save()
            res.status(201).json({message: 'Изменения внесены'})
        } else {
            const lesson = new Lesson()
            const diary = new Diary()
            const student = new Student()
            const school = new School({
                adminId: req.session.user._id,
                school: req.body.school,
                level: req.body.level,
                group: req.body.group,
                lesson: lesson._id,
                diary: diary._id,
                student: student._id
            })
            const auth = await Auth.findById(req.session.user._id)
            
            auth.schoolId = school._id
            auth.lesson = lesson._id
            auth.diary = diary._id
            auth.student = student._id

            req.session.user.schoolId = school._id
            req.session.user.lesson = lesson._id
            req.session.user.diary = diary._id
            req.session.user.student = student._id

            await lesson.save()
            await diary.save()
            await student.save()
            await school.save()
            await auth.save()
            const findUser = await User.findById(req.session.user.user)
            const user = {
                id: String(findUser._id),
                name: findUser.name,
                surname: findUser.surname,
                access: 'admin'
            }
            await Student.findById(school.student).updateOne({$push: {student: user}})

            res.status(201).json({message: 'Класс создан', id: school._id})
        }
    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports.classDelete = async (req, res) => {
    try {
        await School.deleteOne({_id: req.session.user.schoolId})
        await Lesson.deleteOne({_id: req.session.user.lesson})
        await Student.deleteOne({_id: req.session.user.student})
        await Diary.deleteOne({_id: req.session.user.diary})

        await Auth.where({_id: req.session.user._id}).updateOne({$unset: {schoolId: req.session.user.schoolId}})

        delete req.session.user.schoolId
        delete req.session.user.lesson
        delete req.session.user.diary
        delete req.session.user.student
        
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
        const school = await School.findById(req.params.id)
        const student = await Student.findById(school.student)
        const find = student.student.filter(s => s.id === String(req.session.user.user))
        if (find.length > 0) {
            res.status(201).json({message: 'Вы уже присутствуете  классе'})
        } else {
            await Student.findById(school.student).updateOne({$push: {student: user}})
            await Auth.findById(req.session.user._id).updateOne({$set: {schoolId: req.params.id, diary: school.diary, student: school.student, lesson: school.lesson}})
            req.session.user.schoolId = req.params.id
            req.session.user.diary = school.diary
            req.session.user.student = school.student
            req.session.user.lesson = school.lesson
            res.status(201).json({message: 'Вы присоедененились к классу'})
        }
        
    } catch (e) {
        console.log(e)
        res.status(500).json(e)
    }
}

module.exports.joinDelete = async (req, res) => {
    try {
        await Student.updateOne({_id: req.session.user.student}, {$pull: {student: {id: String(req.session.user.user)}}})
        await Auth.where({_id: req.session.user._id}).updateOne({$unset: {schoolId: req.params.id, diary: req.session.user.diary, student: req.session.user.student, lesson: req.session.user.lesson}})
        delete req.session.user.schoolId
        delete req.session.user.lesson
        delete req.session.user.diary
        delete req.session.user.student
        res.status(201).json({message: 'Вы покинули класс'})
    } catch (e) {
        console.log(e)
    
        res.status(500).json(e)
    }
}

module.exports.studentAccess = async (req, res) => {
    try {
        await Student.updateOne({_id: req.session.user.student, "student.id": req.body.id}, {$set: {"student.$.access": req.body.access}})
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
        await Lesson.updateOne({_id: req.session.user.lesson}, {$set: {lesson: req.body.lesson}})
        res.status(201).json({message: 'Расписание изменено'})
    } catch (e) {
        res.status(500).json(e)
    }
}