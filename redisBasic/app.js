import express from "express";
import { createClient } from "redis";

// express
const app = express();
// redis
const redis = createClient();

async function startServer() {
    try {
        //connect to redis
        await redis.connect()
        console.log("redis connected successfully")

        // data store

        await redis.set("name" , "Raufur");

        // data read 
        const name = await redis.get("name");
        console.log("Name" , name);

        app.get("/" , async(req , res)=>{
            const data = await redis.get(name)

            res.json({
                success : true ,
                data,
            })
        })

        app.listen(7000 , ()=>{
            console.log("server is running on port 7000")
        })

    
    } catch (error) {
        console.error(error)
        
    }
}

startServer();

