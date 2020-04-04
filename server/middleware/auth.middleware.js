const jwt = require('jsonwebtoken')
const keys = require('../keys')
const Auth = require('../models/auth.models')

module.exports = async function(req, res, next) {
    if (req.session.token === req.cookies['token-session']) {
        next();
    } else {
        res.redirect('/login?message=session');
    }
}