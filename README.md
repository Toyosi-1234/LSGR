# LSGR Train Booking API

LSGR is a backend REST API for a Lagos train service provider. The system allows commuters to register, log in, view train services and reservations, book train seats, edit their bookings, and cancel bookings.

The system also provides administrative features for managing reservations, viewing registered commuters, and calculating the total number of active bookings.

---

## Features

### Commuter Features

- Sign up with phone number, email, first name, last name, and password.
- Log in with email and password.
- View available train reservations.
- View available train services.
- Book a train seat.
- View personal bookings.
- Edit booking time.
- Cancel a booking.

### Admin Features

- View all registered commuters.
- Create new train reservations.
- Calculate the total number of active bookings.
- Access administrator-only routes using authorization.

---

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- CORS
- dotenv
- Nodemon

---

## Project Structure

```text
LSGR/
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   ├── bookingController.js
│   │   ├── reservationController.js
│   │   └── serviceController.js
│   │
│   ├── middleware/
│   │   ├── adminMiddleware.js
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── Booking.js
│   │   ├── Reservation.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── reservationRoutes.js
│   │   └── serviceRoutes.js
│   │
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
└── article.md

