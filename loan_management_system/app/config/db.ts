// import the package mysql2 to connect to the database

import mysql from "mysql2/promise";
import dotenv from 'dotenv';

dotenv.config();


const databaseConnection = mysql.createPoolConnection(

);


export default databaseConnection;