const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewsController.getHeadlinesUS);
router.get('/jp', viewsController.getHeadlinesJP);
router.get('/tw', viewsController.getHeadlinesTW);
router.get('/cn', viewsController.getHeadlinesCN);
router.get('/kr', viewsController.getHeadlinesKR);

module.exports = router;
