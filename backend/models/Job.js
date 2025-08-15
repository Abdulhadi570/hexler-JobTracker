const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    position: {
        type: String,
        required: [true, 'Please provide a position title'],
        maxlength: 100
    },
    company: {
        type: String,
        required: [true, 'Please provide a company name'],
        maxlength: 100
    },
    applicationDate: {
        type: Date,
        required: [true, 'Please provide an application date'],
        default: Date.now
    },
    jobLink: {
        type: String,
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please provide a valid URL'
        ]
    },
    status: {
        type: String,
        enum: ['Applied', 'Interview', 'Offer', 'Rejected', 'Accepted'],
        default: 'Applied'
    },
    notes: {
        type: String,
        maxlength: 1000
    },
    resume: {
        type: String,
        default: ''
    },
    profilePhoto: {
        type: String,
        default: ''
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// Text search index for position and company
jobSchema.index({ position: 'text', company: 'text' });
// Compound index for user queries
jobSchema.index({ user: 1, createdAt: -1 });
// Status index for filtering
jobSchema.index({ user: 1, status: 1 });

module.exports = mongoose.model('Job', jobSchema);