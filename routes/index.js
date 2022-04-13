const express = require('express');
const router = express.Router();

const doctorRoutes = require('../routes/doctor_routes');
const patientRoutes = require('../routes/patient_route');
const reportRoutes = require('../routes/report_route');

// 'http//localhost:8000/doctors')
router.use('/doctors', doctorRoutes); 

// 'http//localhost:8000/patients')
router.use('/patients', patientRoutes); 

// 'http//localhost:8000/reports')
router.use('/reports', reportRoutes); 

module.exports = router;