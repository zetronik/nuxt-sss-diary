const {Router} = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const auth = require('../controllers/auth.controller');
const router = Router();

// /api/auth/login
router.post( '/login', auth.login);

// /api/auth/user
router.get('/user', auth.user)

// /api/auth/registration
router.post( '/registration', auth.registration);

// /api/auth/logout
router.post('/logout', authMiddleware, auth.logout)

module.exports = router;
