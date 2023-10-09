const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    yearsOfExperience: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['Full-Time', 'Part-Time', 'Internship', 'Temporary', 'Contract'],
        required: true
    },
    field: {
        type: String,
        enum: ['IT', 'Finance', 'Healthcare', 'Education', 'Engineering', 'Arts', 'Sales', 'Marketing', 'HR', 'Others'],
        required: true
    },
    eligibility: {
        type: String,
        enum: ['Any Degree', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD', 'Diploma', 'High School'],
        required: true
    },
    requirements: {
        type: [String], // This will be an array of strings, each string being a requirement
        required: true
    },
    industry: {
        type: String,
        enum: ['Technology', 'Finance', 'Health', 'Education', 'Entertainment', 'Real Estate', 'Manufacturing', 'Retail', 'Others'],
        required: true
    },
    location: {
        type: String,
        enum: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'Others'], // You can add more cities or generalize this further
        required: true
    },
    description: {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    datePosted: {
        type: Date,
        default: Date.now
    }
    // Add any other fields as needed
});

module.exports = mongoose.model('Job', JobSchema);
