const express = require('express');
const router = express.Router();
const { postJob, getAllJobs, getJobById, updateJob, deleteJob, searchJobs } = require('../controllers/jobController');
const auth = require('../middleware/auth');


//search for jobs , job filtering
router.get('/search', searchJobs);
// Route to post a new job
router.post('/post', auth, postJob);

// Route to get all jobs
router.get('/all', getAllJobs);

// Route to get a specific job by ID
router.get('/:jobId', getJobById);

// Route to update a job by its ID
router.put('/update/:jobId', auth, updateJob);

// Route to delete a job by its ID
router.delete('/delete/:jobId', auth, deleteJob);

// @route   GET api/jobs/search
// @desc    Search and filter jobs
// @access  Public




module.exports = router;
