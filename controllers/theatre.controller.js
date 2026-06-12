const theatreService = require("../services/theatre.service")
const{successResponseBody,errorResponseBody} = require("../utils/responseBody")
const {STATUS} = require("../utils/constants")

const create = async(req,res) => {
    try{
       const response = await theatreService.createTheatre(req.body)
       
       successResponseBody.data = response
       successResponseBody.message = "Successfully created the new theatre"
       return res.status(STATUS.CREATED).json(successResponseBody)
    }
    catch(error){
        if(error.err){
            errorResponseBody.error = error.err;
            return res.status(error.code).json(errorResponseBody)
        }
        errorResponseBody.error = error
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
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

const getMovies = async(req,res) => {
    try{
        const response = await theatreService.getMoviesForTheatre(req.params.id);
        if(response.err){
            errorResponseBody.error = response.err
            return res.status(response.code).json(errorResponseBody)
        }
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched all movies for given theatre";
        return res.status(200).json(successResponseBody)
    }
    catch(error){
        errorResponseBody.error = error
        return res.status(500).json(errorResponseBody)
    }
}

const checkMovie = async(req,res) => {
    try{
        const response = await theatreService.checkMovieInATheatre(req.params.theatreId,req.params.movieId);
        if(response.err){
            errorResponseBody.error = response.err;
            return res.status(response.code).json(errorResponseBody)
        }
        successResponseBody.data = response
        successResponseBody.message = "Successfully checked movie is present in theatre or not";
        return res.status(200).json(successResponseBody)
    }
    catch(error){
        errorResponseBody.error = error;
        return res.status(500).json(errorResponseBody)
    }
}

module.exports = {create,destroy,getTheatre,getTheatres,update,updateMoviesInTheatre,getMovies,checkMovie}