const path = require("path");

require("dotenv").config({
    path: path.resolve(__dirname, "../.env")
});

console.log("Mongo URI:", process.env.MONGODB_URI);

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to LSGR Train Booking API"
    });
});

app.use("/api/auth", authRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/reservations", reservationRoutes);

app.use("/api/services", serviceRoutes);

app.use("/api/admin", adminRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "RouteR not found"
    });
});

const PORT = process.env.PORT || 4040;

app.listen(PORT, () => {
    console.log(`LSGR API is running on port ${PORT}`);
});