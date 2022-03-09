const express = require('express');
const headlinesController = require('../controllers/headlinesController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.protect, headlinesController.getHeadlines);

module.exports = router;
