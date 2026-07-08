import dotenv from "dotenv/config";

import app from "./app.js";
import redisCLient from "./config/redis.js";
import connectDb from "./config/db.js";



//config port
const PORT = process.env.PORT || 5000

// start server
const startServer  = async ()=>{
    try {
        // db
        await connectDb()
        

        //redis
        await redisCLient.connect();
        
        //server
        app.listen(PORT ,()=>{
            console.log(`server start successfully at ${PORT}`)
        })
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

startServer()