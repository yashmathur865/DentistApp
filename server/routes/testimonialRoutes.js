const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const { validate, schemas } = require('../middleware/validate');

router.get('/', testimonialController.getTestimonials);
router.post('/', validate(schemas.testimonial), testimonialController.addTestimonial);

module.exports = router;
