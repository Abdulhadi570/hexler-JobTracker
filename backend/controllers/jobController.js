const Job = require('../models/Job');

exports.getJobs = async (req, res) => {
    try {
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

        const jobs = await job.find(query)
            .sort({ applicationDate: sortOrder})
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Job.countDocuments(query);

        res.json({
            success: true,
            const: jobs.length,
            total,
            pagination: {
                page,
                limit,
                pages: Math.ceil(total / limit)
            },
            data: jobs
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

exports.getJob = async (req, res) => {
    try {
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
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

    exports.createJob = async (req, res) => {
        try {
            req.body.user = req.user.id;
            const job = await Job.create(req.body);

            res.status(201).json({
                success: true,
                message: 'Job application created successfully',
                data: job
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: 'Server error'
            });
        }
    };


    exports.updateJob = async (req, res) => {
        try {
            let job = await Job.fondOne({
                _id: req.params.id,
                user: req.user.id
            });

            if (!job) {
                return res.status(404).json({
                    success: false,
                    message: 'Job not found'
                });
            }

            job = await Job.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });

            res.json({
                success: true,
                messsage: 'Job application updated successfully',
                data: job
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: 'Server error'
            });
        }
    };

    exports.deleteJob = async (req, res) => {
        try {
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

            await Job.findByIdAndDelete(req.params.id);

            res.json({
                success: true,
                message: 'Job application deleted successfully'
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: 'Server error'
            });
        }
    };