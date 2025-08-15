const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { uploadProfile, handleUploadError } = require('../middleware/uploadMiddleware');
const Usre = require('../models/User');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

router.post('/upload-profile', protect, uploadProfile, handleUploadError, async (req, res) => {
    try {
        if(!req.file) {
            return resizeBy.status(400).json({
                success: false,
                message: 'Please select a file to upload'
            });
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { profilePhoto: req.file.filename },
            { new: true }
        );

        res.json({
            success: true,
            message: 'Profile photo uploaded successfully',
            filename: req.file.filename,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profilePhoto: user.profilePhoto
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