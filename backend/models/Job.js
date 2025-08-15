const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    positionTitle: {
        type: String,
        required: [true, 'Please provide a position title'],
        maxlength: 100
    },
    companyName: {
        type: String,
        required: [true, 'Please provide a comapny name'],
        maxlength: 100
    },
    applicationDate: {
        type: Date,
        required: [true, 'Please provide an application date'],
        default: Date.now
    },
    jibLink: {
        type: String,
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-z0-9()@:%_\+.~#?&//==]*)/,
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

jobSchema.index({ positionTitle: 'text', companyName: 'text' });
jobSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Job', jobSchema);