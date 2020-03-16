const bcrypt = require('bcrypt-nodejs');
const Auth = require('../models/auth.models');
const User = require('../models/user.models');
const School = require('../models/school.models')

module.exports.user = async (req, res) => {
  try {
  const candidate = await Auth.findById(req.session.user._id)

    if (candidate.user) {
      const user = await User.findById(candidate.user);
      user.name = req.body.name;
      user.surname = req.body.surname;
      await user.save();
      res.status(201).json({message: 'Данные изменены', user})
    } else {
      const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        userId: req.body.userId
      });
      await user.save();
      candidate.user = user._id;
      await candidate.save();
      res.json({message: 'Данные записаны', user})
    }
  } catch (e) {
    res.status(500).json(e)
  }
};

module.exports.fetchUser = async (req, res) => {

  const candidate = await Auth.findById(req.session.user._id);
  
  try {
    if (candidate) {
      const user = await User.findById(candidate.user)
      const school = {}
      const fetchSchool = await School.findById(candidate.schoolId)
      if (fetchSchool) {
        school.id = fetchSchool._id
        school.student = fetchSchool.student
        school.weekLesson = fetchSchool.weekLesson
        school.school = fetchSchool.school
        school.level = fetchSchool.level
        school.group = fetchSchool.group
      }   
      res.json({user, school})
    } else {
      const user = {
        name: '',
        surname: ''
      }
      res.json(user)
    }
  } catch (e) {
    console.log(e)
    res.status(500).json(e)
  }
};

module.exports.changeEmail = async (req, res) => {
  const candidate = await Auth.findById(req.session.user._id);
  try {
    if (candidate) {
      candidate.login = req.body.login;
      await candidate.save();
      req.session.user = candidate
      res.status(201).json({message: 'Email изменен'})
    }
  } catch (e) {
    res.status(500).json(e)
  }
};

module.exports.changePass = async (req, res) => {
  const candidate = await Auth.findById(req.session.user._id);
  try {
    if (candidate) {
      const salt = bcrypt.genSaltSync(10);
      const pass = bcrypt.hashSync(req.body.pass, salt)
      candidate.password = pass;
      await candidate.save();
      req.session.user = candidate
      res.status(201).json({message: 'Email изменен'})
    }
  } catch (e) {
    res.status(500).json(e)
  }
}
