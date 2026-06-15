const movieModel = require("../models/movie.model")
const movieService = require("../services/movie.service")
const {errorResponseBody,successResponseBody} = require("../utils/responseBody")
const {STATUS} =require("../utils/constants")



const createMovie = async(req,res) => {

    try{
        
         const response = await movieService.createMovie(req.body)
         
         successResponseBody.message = "Succesfully Created the movie"
         successResponseBody.data = response
         return res.status(STATUS.CREATED).json(successResponseBody)

    }
    catch(error){
           if(error.err){
            errorResponseBody.error = error.err;
            return res.status(error.code).json(errorResponseBody)
           }
           console.log(error)
           errorResponseBody.error  = error
           return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
    }
}

const deleteMovie = async(req,res) => {
    try{
        const response = await movieService.deleteMovie(req.params.movieId)
        
        successResponseBody.data = response
        successResponseBody.message = "Succesfully deleted the movie"
        return res.status(STATUS.OK).json(successResponseBody)
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

const getMovieById = async(req,res) => {
    try{
            const movie = await movieService.getMovieById(req.params.id)

            if(movie.err){
                console.log(movie)
                errorResponseBody.error = movie.err
                
                return res.status(movie.code).json(errorResponseBody)
            }

            successResponseBody.data = movie
            successResponseBody.message = "Successfuly fetched the given movie"
            return res.status(200).json(successResponseBody)
    }
    catch(err){
        return res.status(500).json(errorResponseBody)
    }
}

const updateMovie = async(req,res) => {
    try{
        const response = await movieService.updateMovie(req.params.id,req.body)
        
        successResponseBody.data = response
        return res.status(STATUS.OK).json(successResponseBody)
    }
    catch(err){
         if(error.err){
            errorResponseBody.error = error.err;
            return res.status(error.code).json(errorResponseBody)
        }
        console.log(err)
        errorResponseBody.error = err
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
    }
}


const getMovies = async(req,res) => {
    try{
        const response = await movieService.fetchMovies(req.query)
        if(response.err){
            errorResponseBody.error = response.err;
            return res.status(response.code).json(errorResponseBody)
        }
        successResponseBody.data = response
        successResponseBody.message = "Succesfully fetched the movie's"
        return res.status(200).json(successResponseBody)
    }
    catch(error){
        errorResponseBody.error = error
        res.status(500).json(errorResponseBody)
    }

}


module.exports = {createMovie,deleteMovie,getMovieById,updateMovie,getMovies}