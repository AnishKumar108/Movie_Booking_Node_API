const badRequestObject = {
            success:false,
            error: "",
            data:{},
            message:"Bad Request Error"
        }

const checkCreateMovieRequest = (req,res,next) => {
    if(!req.body.name){
        badRequestObject.error = "The name of the movie is not sent in the request body"
        return res.status(400).json(badRequestObject)
    }

    if(!req.body.description){
        badRequestObject.error = "The description of the movie is not sent in the request body"
        return res.status(400).json(badRequestObject)
    }

    if(!req.body.casts || !(req.body.casts instanceof Array) || req.body.casts.length<=0){
        badRequestObject.error = "The casts of the movie is not sent in the request body"
        return res.status(400).json(badRequestObject)
    }

    if(!req.body.trailerUrl){
        badRequestObject.error = "The trailerUrl of the movie is not sent in the request body"
        return res.status(400).json(badRequestObject)
    }
    if(!req.body.director){
        badRequestObject.error = "The director of the movie is not sent in the request body"
        return res.status(400).json(badRequestObject)
    }
    if(!req.body.releaseDate){
        badRequestObject.error = "The releaseDate of the movie is not sent in the request body"
        return res.status(400).json(badRequestObject)
    }

    next()
}

module.exports = {
    checkCreateMovieRequest
}