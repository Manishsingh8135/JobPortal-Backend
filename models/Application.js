const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    resume: {
        type: String, // This will be a path to the uploaded resume file
        required: true
    },
    coverLetter: {
        type: String, // A brief message or letter from the applicant
        required: false // This can be optional
    },
    status: {
        type: String,
        enum: ['Pending', 'Reviewed', 'Accepted', 'Rejected'],
        default: 'Pending'
    },
    statusMessage: {
        type: String, // Feedback or reason provided by the employer
        required: false // This can be optional
    },
    dateApplied: {
        type: Date,
        default: Date.now
    }
    // Add any other fields as needed
});

module.exports = mongoose.model('Application', ApplicationSchema);
