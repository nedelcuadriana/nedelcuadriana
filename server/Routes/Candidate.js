const sequelize = require("../sequelize");

const router = require("express").Router();
const Candidate = require("../Entities/Candidate");


router.route("/create").post(async (req, res, next) => {
  try {
    const candidate = await Candidate.create(req.body);
    if (candidate) {
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
        name:"Nedelcu Adriana",
        cv:"Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.",
        email:"nedelcuadriana@gmail.com"
      },
      {
        name:"Ionescu David",
        cv:"Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.",
        email:"ionescudavid@gmail.com"
      },
      {
        name:"Ionascu Calin",
        cv:"Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.",
        email:"ionascucalin@gmail.com"
      },
      {
        name:"Stanciu Mara",
        cv:"Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.",
        email:"stanciumara@gmail.com"
      },
    ];

    for (const item of data) {
      const candidate = new Candidate(item);
      await candidate.save();
    }
    res.status(201).json({ message: "sample created" });
  } catch (err) {
    next(err);
  }
});

router.route("/all").get(async (req, res, next) => {
  try {
    const candidates = await Candidate.findAll();
    if (candidates) {
      res.status(200).json({ candidates });
    } else {
      res.status(404).json({ message: "Error!" });
    }
  } catch (err) {
    next(err);
  }
});

router.route("/getId/:id").get(async (req, res, next) => {
  try {
    const candidate = await Candidate.findByPk(req.params.id);
    if (candidate) {
      res.status(200).json(candidate);
    } else {
      res.status(404).json({ message: "Error!" });
    }
  } catch (err) {
    next(err);
  }
});

router.route("/update/:id").put(async (req, res, next) => {
  try {
    const candidate = await Candidate.findByPk(req.params.id);
    if (candidate) {
      const candidateUpdate = await candidate.update(req.body);
      res.status(200).json(candidateUpdate);
    } else {
      res.status(404).json({ message: "Error!" });
    }
  } catch (err) {
    next(err);
  }
});

router.route("/delete/:id").delete(async (req, res, next) => {
  try {
    const candidate = await Candidate.findByPk(req.params.id);
    if (candidate) {
      const candidateDelete = await candidate.destroy(req.body);
      res.status(200).json(candidateDelete);
    } else {
      res.status(404).json({ message: "Error!" });
    }
  } catch (err) {
    next(err);
  }
});



module.exports = router;