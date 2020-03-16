const {Router} = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const ctr = require('../controllers/settings.controller');
const school = require('../controllers/school.controller')
const router = Router();

// /api/settings/user
router.post('/user',
  authMiddleware,
  ctr.user
  );
// /api/settings/user
router.get('/user',
  authMiddleware,
  ctr.fetchUser
  );

// /api/settings/change/email
router.put('/change/email',
  authMiddleware,
  ctr.changeEmail
);

// /api/settings/change/pass
router.put('/change/pass',
  authMiddleware,
  ctr.changePass
);
// /api/settings/school/class
router.put('/school/class',
  authMiddleware,
  school.createClass
  );

// /api/settings/school/serch/:id
router.get('/school/serch/:id',
  authMiddleware,
  school.serch
  );

// /api/settings/lesson/save/:id
router.put('/lesson/save/:id',
  authMiddleware,
  school.save
  );

module.exports = router;
