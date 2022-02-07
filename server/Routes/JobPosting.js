const sequelize = require("../sequelize");

const router = require("express").Router();
const JobPosting = require("../Entities/JobPosting");


router.route("/create").post(async (req, res, next) => {
    try {
        const jobPosting = await JobPosting.create(req.body);
        if (jobPosting) {
            res.status(200).json({ message: "Created" });
        } else {
            res.status(404).json({ message: "Error!" });
        }
    } catch (err) {
        next(err);
    }
});


router.route("/createSample").get(async (req, res, next) => {
    try {
        await sequelize.sync({ force: true });
        const data = [
            {
                description: "Web Dev Hiring",
                deadline: "2021-09-09"
            },
            {
                description: "Android Developer",
                deadline: "2021-06-12"
            },
            {
                description: "Data Analyst",
                deadline: "2020-07-07"
            },
            {
                description: "C# Developer",
                deadline: "2021-05-03"
            },
        ];

        for (const item of data) {
            const jobPosting = new JobPosting(item);
            await jobPosting.save();
        }
        res.status(201).json({ message: "sample created" });
    } catch (err) {
        next(err);
    }
});



router.route("/all").get(async (req, res, next) => {
    try {
        const jobPostings = await JobPosting.findAll();
        if (req.query.description) {
          const jobPosting = jobPostings.filter((x) => x.description === req.query.description);
          res.status(200).json(jobPosting);
        } else {
        if (req.query.description && req.query.deadline) {
            const jobPosting = jobPostings.filter((x) => x.description === req.query.description && x.deadline === req.query.deadline);
            res.status(200).json(jobPosting);
        } else {
            if (jobPostings) {
                res.status(200).json(jobPostings)
            } else {
                res.status(404).json({ message: "Error!" });
            }
        }
    }
    } catch (err) {
        next(err);
    }
});



router.route("/delete/:id").delete(async (req, res, next) => {
    try {
        const jobPosting = await JobPosting.findByPk(req.params.id);
        if (jobPosting) {
            const jobPostingDelete = await jobPosting.destroy(req.body);
            res.status(200).json(jobPostingDelete);
        } else {
            res.status(404).json({ message: "Error!" });
        }
    } catch (err) {
        next(err);
    }
});

router.route("/update/:id").put(async (req, res, next) => {
    try {
        const jobPosting = await JobPosting.findByPk(req.params.id);
        if (jobPosting) {
            const jobPostingUpdate = await jobPosting.update(req.body);
            res.status(200).json(jobPostingUpdate);
        } else {
            res.status(404).json({ message: "Error!" });
        }
    } catch (err) {
        next(err);
    }
});


router.route("/sorted").get(async (req, res, next) => {
    try {
        const jobPostings = await JobPosting.findAll();
        if (jobPostings) {
            const sortedJobPostings = jobPostings.sort((jobPosting1, jobPosting2) => (jobPosting1.description > jobPosting2.description) ? 1 : -1);
            res.status(200).json(sortedJobPostings);
        } else {
            res.status(404).json({ message: "Error!" });
        }
    } catch (err) {
        next(err);
    }
});


module.exports = router;

