const express = require('express');
const router = express.Router();
const passport = require('passport');

// File containg patient routes logic
const patientController = require('../controllers/patient_controller');

router.post('/register', passport.authenticate('jwt', {session: false}), patientController.register);

router.post('/:id/create_report', passport.authenticate('jwt', {session: false}), patientController.createReport);

router.get('/:id/all_reports', passport.authenticate('jwt', {session: false}), patientController.allReports);

module.exports = router;