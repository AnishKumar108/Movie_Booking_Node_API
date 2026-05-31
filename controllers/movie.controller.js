const movieModel = require("../models/movie.model")
const movieService = require("../services/movie.service")
const {errorResponseBody,successResponseBody} = require("../utils/responseBody")



const createMovie = async(req,res) => {

    try{
         const movie = await movieService.createMovie(req.body)
         successResponseBody.message = "Succesfully Created the movie"
         successResponseBody.data = movie
         return res.status(201).json(successResponseBody)

    }
    catch(err){
           errorResponseBody.error  = err
           return res.status(500).json(errorResponseBody)
    }
}

const deleteMovie = async(req,res) => {
    try{
        const response = await movieService.deleteMovie(req.params.movieId)
        if(response.err){
            errorResponseBody.error = response.err
            return res.status(response.code).json(errorResponseBody)
        }
        successResponseBody.data = response
        successResponseBody.message = "Succesfully deleted the movie"
        return res.status(200).json(successResponseBody)
    }

    
    catch(err){
        errorResponseBody.error = err
        return res.status(500).json(errorResponseBody)
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

module.exports = {createMovie,deleteMovie,getMovieById}