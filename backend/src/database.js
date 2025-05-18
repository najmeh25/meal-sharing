
import knex from "knex";
import "dotenv/config";


const db = knex({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "123456",
    database: process.env.DB_NAME || "meal_sharing",
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









