const errorResponseBody = {
    error:{},
    message:"Something Went Wrong , cannot process the request",
    data:{},
    success:false
    
}
const successResponseBody = {
    error:{},
    message:"Successfully fetched the request",
    data:{},
    success:true
    
}

module.exports = {
    errorResponseBody,successResponseBody
}