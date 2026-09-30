import mysql, { Pool } from "mysql2/promise";

declare global {
  var mysqlPool: Pool | undefined;
}

const databaseConnection: Pool =
  globalThis.mysqlPool ||
  mysql.createPool({
    host: process.env.DATABASE_HOST || "127.0.0.1",
    port: Number(process.env.DATABASE_PORT || 3306),
    user: process.env.DATABASE_USERNAME || "root",
    password: process.env.DATABASE_PASSWORD || "",
    database: process.env.DATABASE_NAME || "loan_management_system",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 5000,
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.mysqlPool = databaseConnection;
}

export default databaseConnection;