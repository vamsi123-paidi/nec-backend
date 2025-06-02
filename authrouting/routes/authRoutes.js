const express = require('express');
const router = express.Router();
const {register,login,dashboard} = require('../controllers/authController');
const authenticate = require('../middlewares/authMiddleware')

router.post('/register',register)
router.post('/login',login);
router.get('/dashboard',authenticate,dashboard)

module.exports = router;