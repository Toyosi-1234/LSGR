const Reservation = require("../models/Reservation");

const createReservation = async (req, res) => {
    try {
        const {
            departureStation,
            destinationStation,
            departureTime,
            serviceType,
            totalSeats
        } = req.body;

        if (
            !departureStation ||
            !destinationStation ||
            !departureTime ||
            !serviceType ||
            !totalSeats
        ) {
            return res.status(400).json({
                success: false,
                message: "All reservation fields are required"
            });
        }

        const reservation = await Reservation.create({
            departureStation,
            destinationStation,
            departureTime,
            serviceType,
            totalSeats,
            availableSeats: totalSeats
        });

        res.status(201).json({
            success: true,
            message: "Reservation created successfully",
            data: reservation
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create reservation",
            error: error.message
        });
    }
};

const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find()
            .sort({ departureTime: 1 });

        res.status(200).json({
            success: true,
            count: reservations.length,
            data: reservations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get reservations",
            error: error.message
        });
    }
};

module.exports = {
    createReservation,
    getReservations
};