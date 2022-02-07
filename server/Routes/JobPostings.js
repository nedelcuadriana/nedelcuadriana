const sequelize = require("../sequelize");

const router = require("express").Router();
const JobPosting = require("../Entities/JobPosting");
const Candidate = require("../Entities/Candidate");


JobPosting.hasMany(Candidate);



//get a specific jobposting's candidates
router.route("/:jobPostingId/candidates").get(async (req, res, next) => {
 try{
    const jobPosting = await JobPosting.findByPk(req.params.jobPostingId,
        {include:[Candidate],
        });
    if (jobPosting) {
      res.status(200).json(jobPosting.candidates);
    } else {
      res.status(404).json({ message: "404 - Job Posting Not Found!" });
    }
 }catch(err){
     next(err);
 }
});

//get a candidate by id from a jobposting by id
router.route("/:jobPostingId/candidates/:candidateId").get(async (req, res, next) => {
    try{
       const jobPosting = await JobPosting.findByPk(req.params.jobPostingId);
       if (jobPosting) {
        const candidates = await jobPosting.getSongs({id:req.params.candidateId})
        const candidate = candidates.shift()
        if (candidate) {
          res.status(202).json(candidate)
        } else {
          res.status(404).json({ message: '404 - Candidate Not Found!' })
        }
      } else {
        res.status(404).json({ message: '404 - JobPosting Not Found!' })
      }
     
    }catch(err){
        next(err);
    }
   });

//post a new candidate into a jobposting
router.route("/:jobPostingId/candidates").post(async (req, res, next) => {
    try{
       const jobPosting = await JobPosting.findByPk(req.params.jobPostingId);
       if (jobPosting) {
        const candidate = new Candidate(req.body);
        candidate.JobPostingId = jobPosting.id;
        await candidate.save();
        res.status(201).json({ message: "Candidate created" });
      } else {
        res.status(404).json({ message: "404 - Job Posting Not Found!" });
      }
     
    }catch(err){
        next(err);
    }
});



//put to update a candidate from a jobposting
router.route("/:jobPostingId/candidates/:candidateId").put(async (req, res, next) => {
    try {
        const jobPosting = await JobPosting.findByPk(req.params.playlistId)
        if (jobPosting) {
          const candidates = await jobPosting.getCandidates({ id: req.params.candidateId })
          const candidate = candidates.shift()
          if (candidate) {
            candidate.name = req.body.name
            candidate.cv = req.body.cv
            candidate.email = req.body.email
            await candidate.save()
            res.status(202).json({ message: 'Candidate updated!'})
          } else {
            res.status(404).json({ message: '404 - Candidate Not Found!' })
          }
        } else {
          res.status(404).json({ message: '404 - JobPosting Not Found!' })
        }
      } catch (err) {
        next(err);
      }
});

//delete a candidate from a jobposting
router.route("/:jobPostingId/candidates/:candidateId").delete(async (req, res, next) => {
    try {
        const jobPosting = await JobPosting.findByPk(req.params.jobPostingId)
        if (jobPosting) {
          const candidates = await jobPosting.getCandidates({ id: req.params.candidateId })
          const candidate = candidates.shift()
          if (candidate) {
            await candidate.destroy()
            res.status(202).json({ message: 'Candidate deleted!'})
          } else {
            res.status(404).json({ message: '404 - Candidate Not Found' })
          }
        } else {
          res.status(404).json({ message: '404 - JobPosting Not Found!' })
        }
      } catch (err) {
        next(err);
      }
});

module.exports = router;