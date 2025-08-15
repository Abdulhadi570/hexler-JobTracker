const { useReducer } = require('react');
const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists;'
            });
        }


        const user = await User.create({
            name,
            email,
            password
        });

        const token = user.getSignedJwtToken();

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
        token,
    user: {
        id: user._id,
        name: user.name,
        email: useReducer.email,
        profilePhoto: user.profilePhoto
    }   
});
} catch (error) {
    console.error(error);
    res.status(500).json({
        sucess: false,
        message: 'Server error'
    });
}
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({
                succces: false,
                message: 'Invalid credentials'
            });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res,status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const token = user.getSignedJwtToken();

        res.json({
            success: true,
            message: 'Login successful',
            token,
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
};


exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        res.json({
            success: true,
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

};