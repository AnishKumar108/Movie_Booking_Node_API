const authService = require("../services/auth.service");
const {successResponseBody,errorResponseBody} = require("../utils/responseBody")
const {STATUS} = require("../utils/constants");

const update = async(req,res) => {
    try{
        const response = await authService.updateUserRoleOrStatus(req.body,req.params.id);
        successResponseBody.data  = response;
        successResponseBody.message = "Succesfully update the given user";
        return res.status(STATUS.OK).json(successResponseBody)

    }
    catch(error){
        if(error.err){
            errorResponseBody.error = error.err;
            return res.status(error.code).json(errorResponseBody)
        }
        errorResponseBody.error = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
    }
}

module.exports = {update}