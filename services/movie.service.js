const movieModel = require("../models/movie.model")

const createMovie = async(data) => {
    try{
        const response = await movieModel.create(data)
        return response
    }
    catch(error){
        if(error.name === "ValidationError"){
             const err = {}
             Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message
             })
             console.log(err)
             return {err:err,code:422}
        }
        else{
            throw error
        }
    }
}

const deleteMovie = async(id) => {
    const response = await movieModel.findByIdAndDelete(id)
   
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