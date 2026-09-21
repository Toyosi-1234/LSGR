const express = require("express");

const authenticate = require("../middleware/authMiddleware");
const authorizeAdmin = require("../middleware/adminMiddleware");

const {
    createReservation,
    getReservations
} = require("../controllers/reservationController");

const router = express.Router();

router.get("/", authenticate, getReservations);

router.post(
    "/",
    authenticate,
    authorizeAdmin,
    createReservation
);

module.exports = router;