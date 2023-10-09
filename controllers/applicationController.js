const Application = require('../models/Application');
const Job = require('../models/Job');
// Controller to apply for a job
// exports.applyForJob = async (req, res) => {
//     try {
//         const { resumeLink:resume, coverLetter } = req.body;

//         const newApplication = new Application({  // <-- Change here
//             user: req.user.id,
//             job: req.params.jobId,
//             resume,
//             coverLetter
//         });

//         const application = await newApplication.save();
//         res.json(application);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// };

//View Applications for a Specific Job (for employers):

// exports.getApplicationsForJob = async (req, res) => {
//     try {
//         const applications = await Application.find({ job: req.params.jobId }).populate('user', 'name email');  // <-- Change here
//         res.json(applications);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// };




exports.applyForJob = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if(!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const job = await Job.findById(req.params.jobId);

        if(!job) {
            return res.status(404).json({ msg: 'Job not found' });
        }

        const newApplication = new Application({
            user: user._id,
            job: job._id,
            resume: user.resume, // Use the resume from the User model
            coverLetter: req.body.coverLetter // Assuming the user sends a cover letter
        });

        // Save application
        const application = await newApplication.save();

        // Add the job to the user's applied jobs
        user.appliedJobs.push(job._id);
        
        // Add the application to the user's applications
        user.applications.push(application._id);

        await user.save();

        res.json(application);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};



exports.getApplicationsForJob = async (req, res) => {
    try {
        // Fetch the job using jobId
        const job = await Job.findById(req.params.jobId);

        // Check if the job exists
        if (!job) {
            return res.status(404).json({ msg: 'Job not found' });
        }

        // Check if the logged-in user is the employer who posted the job
        if (job.postedBy.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // Fetch applications for the job
        const applications = await Application.find({ job: req.params.jobId }).populate('user', 'name email');
        res.json(applications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


exports.getUserApplications = async (req, res) => {
    try {
        const applications = await Application.find({ user: req.user.id }).populate('job', 'title company');  // <-- Change here
        res.json(applications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
