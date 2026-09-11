import mysql from 'mysql2';
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,

});

pool.getConnection((err, connection)=>{
    if(err){
        console.log("mysql connection failed!", err.message);
    }
    else{
        
        console.log("MySql  connection successfully..!");
        connection.release();
    }
});
 const db = pool.promise();

export default db ;