const userController = require("../controllers/user.controller");
const {validateUpdateUserRequest} =  require("../middlewares/user.middlewares")
const {isAuthenticated,isAdmin} = require("../middlewares/auth.middleware")

const route = (app) => {
    app.patch("/mba/api/v1/user/:id",isAuthenticated,validateUpdateUserRequest,isAdmin,userController.update)
}

module.exports = route