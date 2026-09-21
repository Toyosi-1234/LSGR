# Authorization in Node.js: All You Need to Know

## Introduction

Authorization is an important part of backend development and application security. It determines **what an authenticated user is allowed to do** in an application.

In a train booking system such as LSGR, different users have different permissions. A normal commuter should be able to manage their own bookings, while an administrator should be able to manage train reservations and access administrative information.

This is where authorization becomes important.

---

## Authentication vs Authorization

Authentication and authorization are related, but they are not the same.

### Authentication

Authentication answers:

> **Who are you?**

It is the process of verifying the identity of a user.

For example, when a commuter logs in using an email and password, the application checks whether those credentials belong to a registered user.

### Authorization

Authorization answers:

> **What are you allowed to do?**

After a user has been authenticated, authorization determines which resources and actions that user is allowed to access.

For example:

- A commuter can book a train seat.
- A commuter can view their own bookings.
- A commuter can edit or cancel their own booking.
- An administrator can view all registered commuters.
- An administrator can create train reservations.
- An administrator can calculate the total number of bookings.

Authentication verifies identity, while authorization controls permissions.

---

## What Is Authorization in Node.js?

Authorization in Node.js is the process of controlling access to routes, resources, and actions according to the permissions or role of a user.

In an Express.js application, authorization is commonly implemented using **middleware**.

Middleware is a function that runs between the incoming request and the final route handler. It can check information about the authenticated user and decide whether the request should continue.

Example:

```js
const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Admin access required"
        });
    }

    next();
};

module.exports = authorizeAdmin;