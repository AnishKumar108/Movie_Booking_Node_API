const User = require("../models/user.model");
const { errorResponseBody } = require("../utils/responseBody");
const {STATUS} = require("../utils/constants")

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
            throw {err:"No User found with given email id", code:STATUS.NOT_FOUND}
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
      throw{err:"No user found with given id",code:STATUS.NOT_FOUND}
    }
    return response
  }
  catch(error){
    throw error
  }
}

const updateUserRoleOrStatus = async(data,userId) => {
  try{
    const responseQuery = {};
    if(data.userRole){
      responseQuery.userRole = data.userRole
    }
    if(data.userStatus){
      responseQuery.userStatus = data.userStatus
    }
    const response = await User.findByIdAndUpdate(userId,responseQuery,{new:true,runValidators:true});
    if(!response){
      throw {err:"No user found with given user Id",code:STATUS.NOT_FOUND}
    }
    return response;
  }
  catch(error){
    if(error.name == "ValidationError"){
      const err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      console.log(err);
      throw { err: err, code: STATUS.UNPROCESSABLE_ENTITY };
    }
    
    throw error
  }
}


module.exports = { createUser,getUserByEmail ,getuserbyId,updateUserRoleOrStatus};
