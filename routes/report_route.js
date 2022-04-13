const express = require('express');
const router = express.Router();
const passport = require('passport');

// File containg report routes logic
const reportController = require('../controllers/report_controller');

router.get('/:status', passport.authenticate('jwt', {session: false}), reportController.status);

module.exports = router;