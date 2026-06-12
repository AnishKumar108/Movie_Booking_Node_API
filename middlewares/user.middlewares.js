const { errorResponseBody } = require("../utils/responseBody")

const validateUpdateUserRequest = (req,res,next) => {
    if(!(req.body.userRole || req.body.userStatus)){
        errorResponseBody.message = "Malformed request , There must be some parameter";
        return res.status(400).json(errorResponseBody)
    }
    next()
}

module.exports = {
    validateUpdateUserRequest
}