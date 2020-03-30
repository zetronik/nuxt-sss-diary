const {Router} = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const diary = require('../controllers/diary.controller')
const router = Router();

// /api/diary/fetch/:week
router.get('/fetch/:week',
    authMiddleware,
    diary.fetchDiary
);

// /api/diary/lesson
router.get('/lesson',
    authMiddleware,
    diary.lesson
);

// /api/diary/save
router.put('/save',
    authMiddleware,
    diary.save
);

module.exports = router;