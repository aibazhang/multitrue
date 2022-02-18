const express = require('express');
const headlinesController = require('../controllers/headlinesController');

const router = express.Router();

router.get('/', headlinesController.getHeadlines);

module.exports = router;
