const express = require('express');
const router = express.Router();
const authContrllers = require('../controllers/authContrllers');

router
  .route('/')
  .post(authContrllers.handleLogIn);

module.exports = router;
