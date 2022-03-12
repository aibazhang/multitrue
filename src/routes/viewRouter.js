const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewsController.getHeadlinesUS);
router.get('/jp', viewsController.getHeadlinesJP);

module.exports = router;
