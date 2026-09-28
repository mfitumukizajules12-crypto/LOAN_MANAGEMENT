import mysql, { Pool } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Declare global variable for caching in Next.js development mode
declare global {
  
  var mysqlPool: Pool | undefined;
}

// Format: mysql://[username]:[password]@[host]:[port]/[database_name]
const port = Number(process.env.DATABASE_PORT || process.env.PORT) || 3306;

const connectionURI = `mysql://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${port}/${process.env.DATABASE_NAME}`;

// Reuse existing connection pool if present, otherwise create a new pool
const databaseConnection: Pool =
  globalThis.mysqlPool ||
  mysql.createPool(connectionURI);

// Cache the pool instance on globalThis during local development to avoid pool leaks during HMR
if (process.env.NODE_ENV !== "production") {
  globalThis.mysqlPool = databaseConnection;
}

export default databaseConnection;