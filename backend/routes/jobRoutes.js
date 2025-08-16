const express = require('express');
const {
    getJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
} = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');
const { uploadJobFiles, handleUploadError } = require('../middleware/uploadMiddleware');

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getJobs)
    .post(uploadJobFiles, handleUploadError, createJob);

router.route('/:id')
    .get(getJob)
    .put(uploadJobFiles, handleUploadError, updateJob)
    .delete(deleteJob);

module.exports = router;