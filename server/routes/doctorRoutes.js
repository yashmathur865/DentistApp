const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.get('/profile', doctorController.getDoctorProfile);

module.exports = router;
