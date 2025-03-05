
import knex from "./database.js";
import "dotenv/config";
import express from "express";
import db from "./database.js"; 

const app = express();
app.use(express.urlencoded({extended:true}));
const PORT = process.env.PORT || 3000;



//future-meals
app.get("/future-meals", async (req, res) => {
  try {
    const meal = await db.raw("SELECT * FROM meals WHERE `when` > NOW()");
    console.log("✅ Future Meals Query Result:", meal[0]); 
    res.json(meal[0]);
  } catch (error) {
    console.error("❌ Error fetching future meals:", error);
    res.status(500).send("Error fetching future meals");
  }
});



//past-meals
app.get("/past-meals", async (req, res) => {
  try {
    const meal = await db.raw("SELECT * FROM meals WHERE `when` < NOW()");
    res.json(meal[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching past meals");
  }
});


 
//all-meals
app.get("/all-meals", async (req, res) => {
  try {
    const meal = await db.raw("SELECT * FROM meals ORDER BY id");
    res.json(meal[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching all meals");
  }
});

//first-meal
app.get("/first-meal", async (req, res) => {
  try {
    const meal = await db.raw("SELECT * FROM meals ORDER BY id ASC LIMIT 1");
    if (meal[0].length === 0) {
      return res.status(404).send("No meals found");
    }
    res.json(meal[0][0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching first meal");
  }
});
//last-meal
app.get("/last-meal", async (req, res) => {
  try {
    const meal = await db.raw("SELECT * FROM meals ORDER BY id DESC LIMIT 1");
    if (meal[0].length === 0) {
      return res.status(404).send("No meals found");
    }
    res.json(meal[0][0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching last meal");
  }
});

app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});








/*import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from "./database_client.js";
import nestedRouter from "./routers/nested.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

 You can delete this route once you add your own routes
apiRouter.get("/", async (, res) => {
  const SHOW_TABLES_QUERY =
    process.env.DB_CLIENT === "pg"
      ? "SELECT * FROM pg_catalog.pg_tables;"
      : "SHOW TABLES;";
  const tables = await knex.raw(SHOW_TABLES_QUERY);
  res.json({ tables });
});

// This nested router example can also be replaced with your own sub-router
apiRouter.use("/nested", nestedRouter);

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});*/
