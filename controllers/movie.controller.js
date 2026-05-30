const movieModel = require("../models/movie.model")

const createMovie = async(req,res) => {

    try{
         const movie = await movieModel.create(req.body)
         return res.status(201).json({
            success:true,
            error:{},
            data:movie,
            message:"Movie Created Succesfully"


         })

    }
    catch(err){
           return res.status(500).json({
            message:"Something went Wrong",
            error:err,
            data:{},
            success:false
           })
    }
}

const deleteMovie = async(req,res) => {
    try{
        const response = await movieModel.deleteOne({
            _id:req.params.movieId
        })
        return res.status(200).json({
            success:true,
            error:{},
            data:response,
            message:"Succesfully deleted the movie"
        })

    }
    catch(err){
           return res.status(500).json({
            success:false,
            error:err,
            data:{},
            message:"Something went wrong"
           })
    }
}

module.exports = {createMovie,deleteMovie}