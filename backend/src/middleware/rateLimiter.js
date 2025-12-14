import rateLimit from "express-rate-limit"
import client from "../config/redis.js"
import { RedisStore } from "rate-limit-redis"


const rateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message : {
        status: 429,
        massage : 'To many request'
    },

    store: new RedisStore({
        sendCommand: (command, ...args) => client.call( command, ...args)
    })
})

export default rateLimiter