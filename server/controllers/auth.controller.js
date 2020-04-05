const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const keys = require('../keys')
const Auth = require('../models/auth.models')

module.exports.login = async (req, res) => {
  try {
    const candidate = await Auth.findOne({login: req.body.login})
      if (candidate) {
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, candidate.password)
        if (isPasswordCorrect) {
          const accessToken = jwt.sign({
            login: candidate.login,
            userId: candidate._id
          }, keys.JWT)
          req.session.user = candidate
          req.session.token = accessToken
          req.session.isAutintificate = true
          req.session.save(err => {
            if (err) {
              throw err
            }
          })
          candidate.session = req.sessionID
          await candidate.save()
          res.cookie('token-session', accessToken)
          res.json({ token: { accessToken } })
          } else {
            res.status(404).json({message: 'Пользователь не найден'})
          }
      } else {
        res.status(404).json({message: 'Пользователь не найден'})
      }
    } catch (e) {
      res.status(500).json(e)
      throw e
    }
}

module.exports.registration = async (req, res) => {
  console.log(req.body)
  const candidate = await Auth.findOne({login: req.body.login})
  if (candidate) {
    res.status(409).json({message: 'Такой логин уже занят'})
  } else {
    const salt = bcrypt.genSaltSync(10);
    const user = new Auth({
      login: req.body.login,
      password: bcrypt.hashSync(req.body.password, salt)
    })
    await user.save()
    res.status(201).json({message: 'Регистрация прошла успешно, можете войти', user})
  }
}

module.exports.user = (req, res) => {
  try {
    const user = req.session.user
    delete user.password
    res.json({ user: user })
  } catch (e) {
    res.status(500).json(e)
      throw e
  }
}

module.exports.logout = (req, res) => {
  try {
    req.session.destroy()
    res.json({status: "OK"})
  } catch (e) {
    res.status(500).json(e)
      throw e
  }
}

