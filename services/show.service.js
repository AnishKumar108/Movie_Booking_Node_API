const Show = require("../models/show.model");
const Theatre = require("../models/theatre.model")
const {STATUS} = require("../utils/constants");

 
const createShow = async(data) => {
    try{
        const theatre = await Theatre.findById(data.theatreId);
        if(!theatre){
            throw {err:"No theatre found for the given id",code:STATUS.NOT_FOUND}
        }
        if(theatre.movies.indexOf(data.movieId) == -1){
            throw {err:"This movie is not present in given theatre",code:STATUS.NOT_FOUND}
        }

        const response = await Show.create(data);
        return response
    }
    catch(error){
        if (error.name === "ValidationError") {
              const err = {};
              Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
              });
              console.log(err);
              throw { err: err, code: STATUS.UNPROCESSABLE_ENTITY };
            } else {
              throw error;
            }
    }
}

const getShows = async(data) => {
    try{
        let filter = {};
        if(data.theatreId){
            filter.theatreId = data.theatreId
        }
        if(data.movieId){
            filter.movieId = data.movieId
        }

        const response = await Show.find(filter);
        if(!response){
            throw {err:"No show found for given movie in this theatre",code:STATUS.NOT_FOUND}
        }
        return response;
    }
    catch(error){
        console.log(error);
        throw error
    }
}

const destroyShow = async(showId) => {
    try{
        const response = await Show.findByIdAndDelete(showId);
        if(!response){
            throw {err:"No show found for given show Id",code:STATUS.NOT_FOUND}
        }
        return response
    }
    catch(error){
        console.log(error);
        throw error
    }
}

const updateShow = async(id,data) => {
    try{
        const response = await Show.findByIdAndUpdate(id,data,{new:true,runValidators:true});
        if(!response){
            throw {err:"No show found for given show Id",code:STATUS.NOT_FOUND}
        }
        return response;
    }
    catch(error){
        if (error.name === "ValidationError") {
              const err = {};
              Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
              });
              console.log(err);
              throw { err: err, code: STATUS.UNPROCESSABLE_ENTITY };
            } else {
              throw error;
            }
    }
}

module.exports = {createShow,getShows,updateShow,destroyShow}