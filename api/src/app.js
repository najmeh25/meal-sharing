import express from "express";
import mealsRouter from "./routers/meals.js";
import reservationsRouter from "./routers/reservations.js";

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


app.use("/api/meals", mealsRouter);

app.use("/api/reservations", reservationsRouter);



app.get("/", (req, res) => {
  res.send("wellcome");
});


app.listen(PORT, () => {
    console.log(` Server is running on http://localhost:${PORT}`);
  });
  
