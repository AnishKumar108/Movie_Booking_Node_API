const theatreService = require("../services/theatre.service")
const{successResponseBody,errorResponseBody} = require("../utils/responseBody")

const create = async(req,res) => {
    try{
       const response = await theatreService.createTheatre(req.body)
       if(response.err){
        errorResponseBody.error = response.err
        errorResponseBody.message = "Validation Error From few parameters of req body"
        return res.status(response.code).json(errorResponseBody)
       }

       successResponseBody.data = response
       successResponseBody.message = "Successfully created the new theatre"
       return res.status(201).json(successResponseBody)
    }
    catch(error){
        errorResponseBody.error = error
        return res.status(500).json(errorResponseBody)
    }
}

const destroy = async(req,res) => {
    try{
        const response = await theatreService.destroyTheatre(req.params.id)
        if(response.err){
            errorResponseBody.error = response.err
            errorResponseBody.message = "Bad Request Error"

            return res.status(response.code).json(errorResponseBody)
        }
        successResponseBody.data = response
        successResponseBody.message = "Successfully deleted the given theatre"
        return res.status(200).json(successResponseBody)
    }
    catch(error){
        
        errorResponseBody.error = error;
         res.status(500).json(errorResponseBody)
        }
}

const getTheatre = async(req,res) => {
    try{
        const response = await theatreService.getTheatre(req.params.id);
        if(response.err){
            errorResponseBody.error = response.err
            errorResponseBody.message = "No theatre found with the given id"
            return res.status(response.code).json(errorResponseBody)
        }
        successResponseBody.data = response
        successResponseBody.message = "Successfully fetched the given theatre"
        return res.status(200).json(successResponseBody)
    }
    catch(error){
        errorResponseBody.error = error
        return res.status(500).json(errorResponseBody)
    }
}
 
const getTheatres = async(req,res) => {
    try{
        const response = await theatreService.getAllTheatres(req.query)
        successResponseBody.data = response
        successResponseBody.message = "Successfully fetched all the Theatres";
        return res.status(200).json(successResponseBody)
    }
    catch(error){
        errorResponseBody.error = error
        return res.status(500).json(errorResponseBody)
    }
}

const update = async(req,res) => {
    try{
        const response = await theatreService.updateTheatre(req.params.id,req.body);
        if(response.err){
            errorResponseBody.error = response.err
            return res.status(response.code).json(errorResponseBody)
        }
        successResponseBody.data = response
        successResponseBody.message = "Succesfully Updated the given theatre";
        return res.status(200).json(successResponseBody)
    }
    catch(error){
        errorResponseBody.error = error;
        return res.status(500).json(errorResponseBody)
    }
}

const updateMoviesInTheatre = async(req,res) => {
    try{
        const response = await theatreService.updateMoviesInTheatres(req.params.id,req.body.insert,req.body.movieIds)
        if(response.err){
            errorResponseBody.error = response.err
            return res.status(response.code).json(errorResponseBody)
        }
        successResponseBody.data = response
        successResponseBody.message = "Successfully updated the theatre movies"
        return res.status(200).json(successResponseBody)
    }
    catch(error){
        console.log(error)
        errorResponseBody.error = error
        return res.status(500).json(errorResponseBody)
    }

}

module.exports = {create,destroy,getTheatre,getTheatres,update,updateMoviesInTheatre}