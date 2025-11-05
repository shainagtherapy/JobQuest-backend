const express = require("express");
const verifyToken = require("../middleware/verify-token.js");
const Job = require("../models/job.js");
const router = express.Router();

// POST ROUTES
router.post("/", verifyToken, async (req, res) => {
try {
    req.body.author = req.user._id;
    const job = await Job.create(req.body);
    job._doc.author = req.user;
    res.status(201).json(job);
} catch (err) {
    res.status(500).json({ err: err.message });
}
});

module.exports = router;