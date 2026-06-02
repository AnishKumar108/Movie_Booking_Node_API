const {errorResponseBody}  = require("../utils/responseBody")

const checkCreateTheatreRequest = async(req,res,next) => {
        if(!req.body.name){
            errorResponseBody.error = "Bad Request Error"
            errorResponseBody.message = "Name parameter is not present in req body"
            return res.status(400).json(errorResponseBody)
        }
        if(!req.body.address){
            errorResponseBody.error = "Bad Request Error"
            errorResponseBody.message = "Address parameter is not present in req body"
            return res.status(400).json(errorResponseBody)
        }
        if(!req.body.city){
            errorResponseBody.error = "Bad Request Error"
            errorResponseBody.message = "City parameter is not present in req body"
            return res.status(400).json(errorResponseBody)
        }
        if(!req.body.pincode){
            errorResponseBody.error = "Bad Request Error"
            errorResponseBody.message = "pincode parameter is not present in req body"
            return res.status(400).json(errorResponseBody)
        }

        next()
}

module.exports = {checkCreateTheatreRequest}