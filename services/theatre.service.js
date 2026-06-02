const Theatre = require("../models/theatre.model");

const createTheatre = async (data) => {
  try {
    const response = await Theatre.create(data);
    return response;
  } catch (error) {
    if (error.name === "ValidationError") {
      const err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      console.log(err);
      return { err: err, code: 422 };
    } else {
      throw error;
    }
  }
};

const destroyTheatre = async (id) => {
  const response = await Theatre.findByIdAndDelete(id);
  if (!response) {
    return { err: "Cannot find theatre with given id", code: 404 };
  }
  return response
};

const getTheatre = async(id) => {
    const response = await Theatre.findById(id)
    if(!response){
        return {
            err:"Bad Request error",
            code:404
        }
    }
    return response
}

const getAllTheatres = async() => {
    try{
        const response = await Theatre.find({})
        return response
    }
    catch(error){
        console.log(error)
        throw error
    }
}
module.exports = { createTheatre , destroyTheatre , getTheatre , getAllTheatres};
