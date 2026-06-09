const User = require("../models/user.model");

const createUser = async (data) => {
  try {
    const user = await User.create(data);
    return user;
  } catch (error) {
    if (error.name === "ValidationError") {
      const err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      throw { err: err, code: 422 };
    } else {
      throw error;
    }
  }
};

const getUserByEmail = async(email) => {
    try{
        const response = await User.findOne({email});
        if(!response){
            throw {err:"No User found with given email id", code:404}
        }
        return response
    }
    catch(error){
        throw error
    }
}

module.exports = { createUser,getUserByEmail };
