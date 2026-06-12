const express = require("express");
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const Movie = require("./models/movie.model")
const movieRoute = require("./routes/movie.route")
const theatreRoute = require("./routes/theatre.route")
const authRoute = require("./routes/auth.route")
const userRoute = require("./routes/user.route")
const env = require("dotenv")
env.config()

const app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

movieRoute(app);
theatreRoute(app);
authRoute(app);
userRoute(app);

app.get("/home" , (req,res) => {
    console.log("Hitted Homes")
    return res.json({
        success:true,
        message:"Fetched Home"
    })
})

app.listen(process.env.PORT , async() => {
    console.log(`Server is running on port ${process.env.PORT}`)

    try{
        await mongoose.connect(process.env.DB_URL)
        console.log("Succesfully connected to mongodb server")

        

    }
    catch(err){
        console.log(`error while connecting to db ${err}`)
    }
})