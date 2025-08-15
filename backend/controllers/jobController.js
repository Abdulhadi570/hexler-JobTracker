const Job = require('../models/Job');
const asyncHandler = require('../middleware/asyncHandler');

exports.getJobs = asyncHandler(async (req, res, next) => {
    const { search, status, sort = 'desc' } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        let query = { user: req.user.id };

        if (search) {
            query.$or = [
                { positionTitle: { $regex: search, $options: 'i' } },
                { companyName: { $regex: search, $options: 'i'} },
            ];
        }

        if (status && status !== 'all') {
            query.status = status;
        }


        const sortOrder = sort === 'asc' ? 1 : -1;

    const jobs = await Job.find(query)
            .sort({ applicationDate: sortOrder})
        .limit(limit)
            .skip((page - 1) * limit);

        const total = await Job.countDocuments(query);

        res.json({
            success: true,
            count: jobs.length,
            total,
            pagination: {
                page,
                limit,
                pages: Math.ceil(total / limit)
            },
            data: jobs
        });
});

exports.getJob = asyncHandler(async (req, res, next) => {
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

        res.json({
            success: true,
            data: job
        });
});

exports.createJob = asyncHandler(async (req, res, next) => {
    req.body.user = req.user.id;
    const job = await Job.create(req.body);

            res.status(201).json({
                success: true,
                message: 'Job application created successfully',
                data: job
            });
});


exports.updateJob = asyncHandler(async (req, res, next) => {
    const job = await Job.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

            if (!job) {
                return res.status(404).json({
                    success: false,
                message: 'Job not found or user not authorized'
                });
            }

            res.json({
                success: true,
        message: 'Job application updated successfully',
                data: job
            });
});

exports.deleteJob = asyncHandler(async (req, res, next) => {
    const job = await Job.findOneAndDelete({
                _id: req.params.id,
                user: req.user.id
            });

            if (!job) {
                return res.status(404).json({
                    success: false,
                message: 'Job not found or user not authorized'
                });
            }

            res.json({
                success: true,
                message: 'Job application deleted successfully'
            });
});