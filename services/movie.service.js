const movieModel = require("../models/movie.model")

const createMovie = async(data) => {
    const response = await movieModel.create(data)
    return response
}

const deleteMovie = async(id) => {
    const response = await movieModel.findByIdAndDelete(id)
    console.log(response)
    if(!response){
        return {
            err:"Cannot find the movie corresponding to given id",
            code:404
        }
    }
    return response
}

const getMovieById = async(id) => {
        const movie = await movieModel.findById(id);
        if(!movie){
            return  {
            err:"Not Found the movie corrsponding to given id",
            code:404
            
         }
        }

        return movie

}

module.exports = {createMovie , deleteMovie , getMovieById}