const express = require('express');
const newsController = require('../controllers/newsController');
const authController = require('../controllers/authController');

const router = express.Router();
router.get('/:id', authController.protect, newsController.getNews);
router.post('/', authController.protect, newsController.createNews);

module.exports = router;
