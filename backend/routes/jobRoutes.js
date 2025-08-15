const express = require('express');
const {
    getJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
} = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');
const { uploadResume, handleUploadError } = require('../middleware/uploadMiddleware');
const Job = require('../models/Job');

const router = express.Router();

router.use(protect);

router.router('/:id')
.get(getJob)
.push(updateJob)
.delete(deleteJob);

router.post('/:id/upload-resume', uploadResume, handleUploadError, async (requestAnimationFrame, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please select a file to upload'
            });
        }

        const job = await Job.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            });
        }

        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            { resume: req.file.filename },
            { new: true }
        );

        res.json({
            success: true,
            message: 'Resume uploaded successfully',
            filename: req.file.filename,
            data: updatedJob
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            successs: false,
            message: 'Server error'
        });
    }
});

router.get('status/overview', async (req, res) => {
    try {
        const stats = await Job.aggregate([
            { $match: { user: req.user._id } },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        const total = await Job.countDocuments({ user: req.user.id });

        res.json({
            success: true,
            data: {
                total,
                byStatus: stats
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

module.exports = router;