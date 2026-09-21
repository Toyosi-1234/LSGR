const express = require("express");

const authenticate = require("../middleware/authMiddleware");

const {
    createBooking,
    getMyBookings,
    updateBooking,
    cancelBooking
} = require("../controllers/bookingController");

const router = express.Router();

router.post("/", authenticate, createBooking);

router.get("/", authenticate, getMyBookings);

router.put("/:id", authenticate, updateBooking);

router.delete("/:id", authenticate, cancelBooking);

module.exports = router;