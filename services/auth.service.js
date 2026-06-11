const User = require("../models/user.model");
const { errorResponseBody } = require("../utils/responseBody");

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

const getuserbyId = async(id) => {
  try{
    const response = await User.findById(id);
    
    if(!response){
      throw{err:"No user found with given id",code:404}
    }
    return response
  }
  catch(error){
    throw error
  }
}

const updateUserRoleOrStatus = async(data,userId) => {
  try{
    const user = await User.findById(userId);
    if(!user){
      throw {err:"No user found with given user id",code:404}
    };
    let dataQuery = {}
    if(data.userRole){
      dataQuery.userRole = data.userRole
    }
    if(data.userStatus){
      dataQuery.userStatus = data.userStatus
    }
    const response = await user.updateOne(dataQuery,{new:true,runValidators:true});
    return response
  }
  catch(error){
    console.log(error);
    throw error
}
}

module.exports = { createUser,getUserByEmail ,getuserbyId,updateUserRoleOrStatus};
