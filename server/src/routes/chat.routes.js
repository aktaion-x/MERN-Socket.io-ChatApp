const router = require('express').Router();
const requireAuth = require('../middlewares/requireAuth');
const { getChatController, getAllUsersController } = require('../controllers/chatController');

router.get('/all', requireAuth, getAllUsersController);
router.get('/:id', requireAuth, getChatController);

module.exports = router;