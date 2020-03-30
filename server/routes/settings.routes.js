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

// /api/settings/school/class/delete
router.delete('/school/class/delete',
  authMiddleware,
  school.classDelete
  );

// /api/settings/school/serch/:id
router.get('/school/serch/:id',
  authMiddleware,
  school.serch
  );

// /api/settings/school/join/created/:id
router.put('/school/join/created/:id',
  authMiddleware,
  school.schoolJoin
  );

// /api/settings/school/settings/access
router.put('/school/settings/access',
  authMiddleware,
  school.studentAccess
  );

// /api/settings/school/join/delete
router.delete('/school/join/delete',
  authMiddleware,
  school.joinDelete
  );

// /api/settings/lesson/save
router.put('/lesson/save',
  authMiddleware,
  school.save
  );

module.exports = router;
