const express = require("express");

const authenticate = require("../middleware/authMiddleware");
const authorizeAdmin = require("../middleware/adminMiddleware");

const {
    getAllUsers,
    getBookingCount
} = require("../controllers/adminController");

const router = express.Router();

router.get(
    "/users",
    authenticate,
    authorizeAdmin,
    getAllUsers
);

router.get(
    "/bookings/count",
    authenticate,
    authorizeAdmin,
    getBookingCount
);

module.exports = router;