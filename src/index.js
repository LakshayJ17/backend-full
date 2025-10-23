// require('dotenv').config({path: './env'})

import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})

connectDB()





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