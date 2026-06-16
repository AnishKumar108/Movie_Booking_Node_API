const bookingController = require("../controllers/booking.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const bookingMiddleware = require("../middlewares/booking.middleware")


const routes = (app) => {
    app.post("/mba/api/v1/bookings",authMiddleware.isAuthenticated,bookingMiddleware.validateCreateBookingRequest,
    bookingController.create);

    app.patch("/mba/api/v1/bookings/:id",authMiddleware.isAuthenticated,bookingMiddleware.checkChangeStatusRequest,bookingController.update);

    app.get("/mba/api/v1/bookings",authMiddleware.isAuthenticated,bookingController.Bookings);

    app.get("/mba/api/v1/bookings/all",authMiddleware.isAuthenticated,authMiddleware.isAdmin,bookingController.allBookings);
    
    
}

module.exports = routes