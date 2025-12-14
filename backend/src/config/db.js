import mysql from "mysql2/promise"
import dotenv from "dotenv"

dotenv.config()

const db = await mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    port: process.env.SQL_PORT

})


export default db