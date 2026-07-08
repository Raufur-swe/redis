// create redis client

import { createClient } from "redis";

//create a client
const redisCLient = createClient({
    url : `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
})


redisCLient.on("connect" ,()=>{
    console.log("redis connecting")
})

redisCLient.on("ready",()=>{
    console.log("redis connected successfully")
})
redisCLient.on("error",(error)=>{
    console.log("redis error : " , error.message)
})
redisCLient.on("end",()=>{
    console.log("redis connections closed")
})

export default redisCLient