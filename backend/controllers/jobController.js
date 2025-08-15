const Job = require('../models/Job');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

exports.getJobs = asyncHandler(async (req, res, next) => {
    const { search, status, sort = 'desc' } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        let query = { user: req.user.id };

        if (search) {
            query.$text = { $search: search };
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
            return next(new ErrorResponse(`Job not found with id of ${req.params.id}`, 404));
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
                return next(new ErrorResponse(`Job not found with id of ${req.params.id} or user not authorized`, 404));
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
                return next(new ErrorResponse(`Job not found with id of ${req.params.id} or user not authorized`, 404));
            }

            res.json({
                success: true,
                message: 'Job application deleted successfully'
            });
});