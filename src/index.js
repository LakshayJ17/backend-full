// require('dotenv').config({path: './env'})

import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: ".env"
})

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Sever running on ${process.env.PORT}`);

        })
    })
    .catch((err) => {
        console.log("MONGODB CONNECTION FAILED !! : ", err);

    })




/*
import express from "express"

const app = express()

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        
        // express checks 
        app.on("error", (error) => {
            console.log("ERROR : ", error);
            throw error  
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port http://localhost:${PORT}`)
        }) 
    } catch (error) {
        console.log("ERROR CONNECTING TO DB :", error);
        throw error
    }
})()
*/