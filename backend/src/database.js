import knex from "knex";
import "dotenv/config";

const db = knex({
  client: process.env.DB_CLIENT || "mysql2",
  connection: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "123456",
    database: process.env.DB_NAME || "meal_sharing",
    ssl: process.env.DB_USE_SSL === "true" ? { rejectUnauthorized: false } : false,
  },
  pool: { min: 2, max: 10 }
});

db.raw("SELECT 1")
  .then(() => console.log("✅ Connected to MySQL database successfully!"))
  .catch((err) => {
    console.error("❌ Failed to connect to MySQL:", err);
    process.exit(1);
  });

export default db;
