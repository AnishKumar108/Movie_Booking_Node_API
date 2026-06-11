const authService = require("../services/auth.service");
const {successResponseBody,errorResponseBody} = require("../utils/responseBody")

const update = async(req,res) => {
    try{
        const response=await authService.updateUserRoleOrStatus(req.body,req.params.id);
        successResponseBody.message = "Succesfully update iser role or status";
        successResponseBody.data = response;
        return res.status(200).json(successResponseBody)

    }
    catch(error){
        if(error.err){
            errorResponseBody.error = error.err;
            return res.status(error.code).json(errorResponseBody)
        }
        errorResponseBody.error = error;
        return res.status(500).json(errorResponseBody)
    }
}

module.exports = {update}