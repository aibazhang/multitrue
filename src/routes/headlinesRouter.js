const express = require('express');
const headlinesController = require('../controllers/headlinesController');

const router = express.Router();

router.route('/').get(headlinesController.getHeadlines);

module.exports = router;
