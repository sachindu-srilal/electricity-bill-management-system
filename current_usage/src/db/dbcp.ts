
import mysql,{Pool} from "promise-mysql";
import env from 'dotenv'
env.config()

const dbConfig = {
    user:process.env.APP_USER,
    password: process.env.APP_PASSWORD,
    database: process.env.APP_DATABASE,
    host: process.env.APP_HOST,
    connectionLimit: +process.env.APP_CONNECTION_LIMIT!,
    port:+process.env.APP_DB_PORT!
}

module.exports=async () => {
    try {
        let pool;
        let con;
            pool = await mysql.createPool(dbConfig);
            con = pool.getConnection();
        return con;
    } catch (ex) {
        throw ex;
    }
}


