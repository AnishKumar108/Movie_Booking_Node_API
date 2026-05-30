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
            success:true
           })
    }
}

module.exports = {createMovie}