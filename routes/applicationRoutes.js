const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();
const { applyForJob, getApplicationsForJob, getUserApplications } = require('../controllers/applicationController');

// @route   POST api/applications/apply/:jobId
// @desc    Apply for a job
// @access  Private (only logged-in users)
router.post('/apply/:jobId',auth, applyForJob);

// @route   GET api/applications/job/:jobId
// @desc    Get applications for a specific job
// @access  Private (for employers)
router.get('/job/:jobId', auth, getApplicationsForJob);

// @route   GET api/applications/user
// @desc    Get applications made by a specific user
// @access  Private (for job seekers)
router.get('/user', getUserApplications);

module.exports = router;
