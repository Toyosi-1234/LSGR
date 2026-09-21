const express = require("express");

const authenticate = require("../middleware/authMiddleware");

const {
    getServices
} = require("../controllers/serviceController");

const router = express.Router();

router.get("/", authenticate, getServices);

module.exports = router;