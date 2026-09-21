const User = require("../models/User");
const Booking = require("../models/Booking");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get commuters",
            error: error.message
        });
    }
};

const getBookingCount = async (req, res) => {
    try {
        const totalBookings = await Booking.countDocuments({
            status: "booked"
        });

        res.status(200).json({
            success: true,
            totalBookings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to calculate bookings",
            error: error.message
        });
    }
};

module.exports = {
    getAllUsers,
    getBookingCount
};