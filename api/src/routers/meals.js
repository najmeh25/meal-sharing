import knex from "../database.js";
import "dotenv/config";
import express from "express";
import db from "../database.js"; 

const app = express();

const PORT = process.env.PORT || 3000;
const router = express.Router();


// GET /api/meals 
router.get("/", async (req, res) => {
  try {
    const meals = await knex("meals").select("*");
    res.json(meals);
  } catch (error) {
    res.status(500).json({ error: "It has error" });
  }
});



// GET /api/meals/:id 
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
        const meal = await knex("meals").where({ id }).first();
    if (!meal) return res.status(404).json({ error: "Meal not found" });
        const result = await knex("reservations")
      .where({ meal_id: id })
      .sum("number_of_guests as total_reserved");
    const totalReserved = result[0].total_reserved || 0;
       const availableReservations = meal.max_reservations - totalReserved;
       res.json({
      ...meal,
      available_reservations: availableReservations,
    });
  } catch (error) {
    console.error("Error fetching meal with reservations:", error);
    res.status(500).json({ error: "Error fetching meal with reservations" });
  }
});


// POST /api/meals 
router.post("/", async (req, res) => {
  try {
    const [id] = await knex("meals").insert(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: "Error adding meal" });
  }
});

// PUT /api/meals/:id 
router.put("/:id", async (req, res) => {
  try {
    const updated = await knex("meals").where({ id: req.params.id }).update(req.body);
    if (!updated) return res.status(404).json({ error: "Meal not found" });
    res.json({ message: "Meal updated" });
  } catch (error) {
    res.status(500).json({ error: "Error updating meal" });
  }
});

// DELETE /api/meals/:id 
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await knex("meals").where({ id: req.params.id }).del();
    if (!deleted) return res.status(404).json({ error: "Meal not found" });
    res.json({ message: " deleted meal" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting meal" });
  }
});



  export default router;