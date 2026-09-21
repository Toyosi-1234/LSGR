const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
    {
        departureStation: {
            type: String,
            required: true
        },

        destinationStation: {
            type: String,
            required: true
        },

        departureTime: {
            type: Date,
            required: true
        },

        serviceType: {
            type: String,
            enum: ["Reservation", "Business", "Economy"],
            required: true
        },

        totalSeats: {
            type: Number,
            required: true,
            min: 1
        },

        availableSeats: {
            type: Number,
            required: true,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Reservation", reservationSchema);