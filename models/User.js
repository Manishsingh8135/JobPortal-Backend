const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // Reference to the clerk authentication ID
    id: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    mobileNumber: {
        type: String,
        unique: true,
        required: true,
    },
    image: {
        type: String,
        default: null
    },
    bio: {
        type: String,
        default: null
    },
    role: {
        type: String,
        enum: ['employer', 'jobSeeker'],
        default: 'jobSeeker'
    },
    dateJoined: {
        type: Date,
        default: Date.now
    },
    resume: {
        type: String, // URL to the uploaded resume
        default: null,
        required:true,
    },
    skills: [{
        type: String,
    }],
    jobListings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }],
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    }],
    savedJobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }],
    appliedJobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }]
    // Add other fields as needed
});

module.exports = mongoose.model('User', UserSchema);
