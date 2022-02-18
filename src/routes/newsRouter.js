const express = require('express');
const newsController = require('../controllers/newsController');

const router = express.Router();
router.get('/:id', newsController.getNews);
router.post('/', newsController.createNews);

module.exports = router;
