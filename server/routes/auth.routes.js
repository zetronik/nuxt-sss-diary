const {Router} = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const auth = require('../controllers/auth.controller');
const router = Router();

// /api/auth/login
router.post( '/login', auth.login);

// /api/auth/registration
router.post( '/registration', auth.registration);

// /api/auth/logout
router.get('/logout', authMiddleware, auth.logout)

module.exports = router;
