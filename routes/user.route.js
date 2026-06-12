const userController = require("../controllers/user.controller");
const {validateUpdateUserRequest} =  require("../middlewares/user.middlewares")

const route = (app) => {
    app.patch("/mba/api/v1/user/:id",validateUpdateUserRequest,userController.update)
}

module.exports = route