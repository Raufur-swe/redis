// database connections

import mongoose from "mongoose"

const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            dbName : "urlShortner"
        })
        console.log("Database connected")
    } catch (error) {
        console.error("mongodb disconnected")
        process.exit(1)
    }
}

export default connectDb