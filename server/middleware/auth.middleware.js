const jwt = require('jsonwebtoken')
const keys = require('../keys')
const Auth = require('../models/auth.models')

module.exports = async function(req, res, next) {
    if (req.session.user._id) {
        const user = await Auth.findById(req.session.user._id) 
            if (user) {
                next();
            } else {
                res.redirect('/login?message=session');
            }
        
    } else {
    res.redirect('/login?message=session');
    }
        
}