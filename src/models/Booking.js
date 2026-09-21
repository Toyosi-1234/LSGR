const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        reservation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Reservation",
            required: true
        },

        seatNumber: {
            type: String,
            required: true
        },

        bookingTime: {
            type: Date,
            required: true
        },

        status: {
            type: String,
            enum: ["booked", "cancelled"],
            default: "booked"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Booking", bookingSchema);