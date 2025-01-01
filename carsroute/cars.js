const router = require("express").Router();
const { createBmwRestrictionMessage } = require("../CarsControllers/Bmw");

// Route to create a BMW restriction message
router.post("/messages", createBmwRestrictionMessage);

module.exports = router;
