const paymentController = require("../controllers/payment.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const paymentMiddleware = require("../middlewares/payment.middleware")

const route = (app) => {
    app.post("/mba/api/v1/payments",authMiddleware.isAuthenticated,paymentMiddleware.verifyCreatePaymentRequest,paymentController.create);

    app.get("/mba/api/v1/payments/:id",authMiddleware.isAuthenticated,paymentController.getPaymentDetailsById);

    app.get("/mba/api/v1/payments",authMiddleware.isAuthenticated,paymentController.getAllPayments)
}

module.exports = route