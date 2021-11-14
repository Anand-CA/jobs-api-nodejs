const express = require("express");
const { getalljobs, searchJobs, getById } = require("./job.controller");
const router = express.Router();

router.get("/", getalljobs);
router.get("/getById/:id", getById);

module.exports = router;
