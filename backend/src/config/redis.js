import RedisClient from 'ioredis'
import dotenv from "dotenv"

dotenv.config()

const client = new RedisClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
})

// check redis connect or error
// client.on('connect', () =>{
//     console.log('Redis Connected');
// })

// client.on('error', (err) =>{
//     console.log('Redis Error', err);
// })


export default client;