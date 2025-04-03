import express from "express";
import cors from 'cors';
import mealsWeek3Router from "./routers/meals_week3.js";
//import mealsRouter from "./routers/meals.js";
import reservationsRouter from "./routers/reservations.js";
import reviewsRouter from "./routers/reviews.js";

import knex from "./database.js";
import "dotenv/config";

const app = express();
app.use(cors());
const PORT = process.env.PORT || 4000;


app.use(express.json());

app.use("/api/meals", mealsWeek3Router);
/*app.use("/api/meals", mealsRouter);*/

app.use("/api/reservations", reservationsRouter);

app.use("/api/reviews", reviewsRouter);



app.get("/", (req, res) => {
  res.send("wellcome");
});


app.listen(PORT, () => {
    console.log(` Server is running on http://localhost:${PORT}`);
  });
  
