const Booking = require("../models/Booking");
const Reservation = require("../models/Reservation");

const createBooking = async (req, res) => {
    try {
        const { reservationId, seatNumber, bookingTime } = req.body;

        if (!reservationId || !seatNumber || !bookingTime) {
            return res.status(400).json({
                success: false,
                message: "reservationId, seatNumber and bookingTime are required"
            });
        }

        const reservation = await Reservation.findById(reservationId);

        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: "Reservation not found"
            });
        }

        if (reservation.availableSeats <= 0) {
            return res.status(400).json({
                success: false,
                message: "No seats available"
            });
        }

        const existingSeat = await Booking.findOne({
            reservation: reservationId,
            seatNumber,
            status: "booked"
        });

        if (existingSeat) {
            return res.status(409).json({
                success: false,
                message: "This seat has already been booked"
            });
        }

        const booking = await Booking.create({
            user: req.user.id,
            reservation: reservationId,
            seatNumber,
            bookingTime
        });

        reservation.availableSeats -= 1;
        await reservation.save();

        const populatedBooking = await Booking.findById(
            booking._id
        ).populate("reservation");

        res.status(201).json({
            success: true,
            message: "Train seat booked successfully",
            data: populatedBooking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create booking",
            error: error.message
        });
    }
};

const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({
            user: req.user.id
        })
            .populate("reservation")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get bookings",
            error: error.message
        });
    }
};

const updateBooking = async (req, res) => {
    try {
        const { bookingTime } = req.body;

        if (!bookingTime) {
            return res.status(400).json({
                success: false,
                message: "Booking time is required"
            });
        }

        const booking = await Booking.findOne({
            _id: req.params.id,
            user: req.user.id,
            status: "booked"
        });

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        booking.bookingTime = bookingTime;

        await booking.save();

        res.status(200).json({
            success: true,
            message: "Booking time updated successfully",
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update booking",
            error: error.message
        });
    }
};

const cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findOne({
            _id: req.params.id,
            user: req.user.id,
            status: "booked"
        });

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        booking.status = "cancelled";
        await booking.save();

        await Reservation.findByIdAndUpdate(
            booking.reservation,
            {
                $inc: {
                    availableSeats: 1
                }
            }
        );

        res.status(200).json({
            success: true,
            message: "Booking cancelled successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to cancel booking",
            error: error.message
        });
    }
};

module.exports = {
    createBooking,
    getMyBookings,
    updateBooking,
    cancelBooking
};