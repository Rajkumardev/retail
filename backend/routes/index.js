const express = require("express");
const router = express.Router();

/* Initializing other routes */
router.use("/", require("./csv"));

module.exports = router;
