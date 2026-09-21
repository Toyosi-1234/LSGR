const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        phoneNumber: {
            type: String,
            required: true,
            unique: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        firstName: {
            type: String,
            required: true,
            trim: true
        },

        lastName: {
            type: String,
            required: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["commuter", "admin"],
            default: "commuter"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);