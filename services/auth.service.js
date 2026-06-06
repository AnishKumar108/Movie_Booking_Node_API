const User = require("../models/user.model");

const createUser = async(data) => {
    try{
        const user = await User.create(data);
        return user
    }
    catch(error){
        console.log(error);
        throw error
    }
}

module.exports = {createUser}