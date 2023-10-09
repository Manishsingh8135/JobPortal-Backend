const Job = require('../models/Job');
const User = require('../models/User');

// Controller to post a new job
// Controller to post a new job
exports.postJob = async (req, res) => {
    const { 
        title, 
        company, 
        location, 
        salary, 
        description, 
        requirements, 
        yearsOfExperience, 
        type, 
        field, 
        eligibility, 
        industry 
    } = req.body;

    try {
        // Check if the job title already exists
        let job = await Job.findOne({ title });

        if (job) {
            return res.status(400).json({ msg: 'Job with this title already exists' });
        }

        // Create a new job
        job = new Job({
            postedBy: req.user.id,  // User ID from the auth middleware
            title,
            company,
            location,
            salary,
            description,
            requirements,
            yearsOfExperience,
            type,
            field,
            eligibility,
            industry
        });

        await job.save();

        res.json(job);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Controller to get all jobs
exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate('postedBy', 'name'); // This will also fetch the name of the user who posted the job
        res.json(jobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


// Controller to get a specific job by ID
exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId).populate('postedBy', 'name'); // Fetch job by ID and also get the name of the user who posted it

        if (!job) {
            return res.status(404).json({ msg: 'Job not found' });
        }

        res.json(job);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') { // If the provided ID is not a valid ObjectId
            return res.status(404).json({ msg: 'Job not found' });
        }
        res.status(500).send('Server error');
    }
};


// Controller to update a job by its ID
exports.updateJob = async (req, res) => {
    try {
        let job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ msg: 'Job not found' });
        }

        // Ensure the user is the one who posted the job
        if (job.postedBy.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        job = await Job.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }); // Update the job

        res.json(job);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};



// Controller to delete a job by its ID
exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ msg: 'Job not found' });
        }

        // Ensure the user is the one who posted the job
        if (job.postedBy.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await job.remove();

        res.json({ msg: 'Job removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


// Search and filter jobs
exports.searchJobs = async (req, res) => {
    try {
        let query = {};

        // Check if company filter is provided
        if (req.query.company) {
            query.company = new RegExp(req.query.company, 'i'); // This creates a case-insensitive regex search
        }

        // Add more filters as needed...

        const jobs = await Job.find(query);

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({ msg: 'Job not found' });
        }

        res.json(jobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
