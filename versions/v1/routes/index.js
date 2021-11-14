const express = require("express");
const router = express.Router();

router.use("/jobs", require("../api/job/job.route"));

module.exports = router;
