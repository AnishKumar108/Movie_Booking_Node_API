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
  return response;
};

const getTheatre = async (id) => {
  const response = await Theatre.findById(id);
  if (!response) {
    return {
      err: "Bad Request error",
      code: 404,
    };
  }
  return response;
};

const getAllTheatres = async (data) => {
  try {
    let query = {};
    let pagination = {};
    if (data && data.city) {
      query.city = data.city;
    }

    if (data && data.pincode) {
      query.pincode = data.pincode;
    }

    if (data && data.name) {
      query.name = data.name;
    }

    if (data && data.movieId) {
      query.movies = { $all: data.movieId };
    }

    if (data && data.limit) {
      pagination.limit = data.limit;
    }

    if (data && data.skip) {
      let perPage = data.limit ? data.limit : 3;
      pagination.skip = data.skip * perPage;
    }

    const response = await Theatre.find(query, {}, pagination);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateTheatre = async (id, data) => {
  try {
    const response = await Theatre.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      return { err: "Not Found Theatre with given id", code: 404 };
    }
    return response;
  } catch (error) {
    console.log(error);
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

const updateMoviesInTheatres = async (theatreId, insert, movieIds) => {
  try {
    let theatre;
    if (insert) {
      theatre = await Theatre.findByIdAndUpdate(
        { _id: theatreId },
        { $addToSet: { movies: { $each: movieIds } } },
        { new: true },
      );
    } else {
      theatre = await Theatre.findByIdAndUpdate(
        { _id: theatreId },
        { $pull: { movies: { $in: movieIds } } },
        { new: true },
      );
    }
    return theatre.populate("movies");
  } catch (error) {
    if (error.name === "TypeError") {
      return { err: "Not Found theatre with given Theatre Id", code: 404 };
    } else {
      throw error;
    }
  }
};

const getMoviesForTheatre = async (id) => {
  try {
    const theatre = await Theatre.findById(id, {
      name: 1,
      address: 1,
      movies: 1,
    }).populate("movies");
    if(!theatre){
      return {err:"No theatre found with given theatre id",code:404}
    }
    return theatre
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  createTheatre,
  destroyTheatre,
  getTheatre,
  getAllTheatres,
  updateTheatre,
  updateMoviesInTheatres,
  getMoviesForTheatre
};
