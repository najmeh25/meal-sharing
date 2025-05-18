import express from "express";
import knex from "../database.js";
import "dotenv/config";

const router = express.Router();

// ✅ GET /api/meals — Get all meals
router.get("/", async (req, res) => {
  try {
    const meals = await knex("meals").select("*");
    res.json(meals);
  } catch (error) {
    console.error("Error fetching meals:", error);
    res.status(500).json({ error: "Error fetching meals" });
  }
});

// ✅ GET /api/meals/:id — Get one meal with available reservations
router.get("/:id", async (req, res) => {
  try {
    const mealId = req.params.id;

    const meal = await knex("meals")
      .leftJoin("reservations", "meals.id", "reservations.meal_id")
      .select("meals.*")
      .sum("reservations.number_of_guests as total_reserved")
      .where("meals.id", mealId)
      .groupBy("meals.id")
      .first();

    if (!meal) {
      return res.status(404).json({ error: "Meal not found" });
    }

    const totalReserved = Number(meal.total_reserved) || 0;
    const availableReservations = meal.max_reservations - totalReserved;

    res.json({
      ...meal,
      total_reserved: totalReserved,
      available_reservations: availableReservations,
    });
  } catch (error) {
    console.error("Error fetching meal:", error);
    res.status(500).json({ error: "Error fetching meal" });
  }
});

// ✅ POST /api/meals — Create a new meal
router.post("/", async (req, res) => {
  try {
    const [id] = await knex("meals").insert(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (error) {
    console.error("Error adding meal:", error);
    res.status(500).json({ error: "Error adding meal" });
  }
});

// ✅ PUT /api/meals/:id — Update a meal
router.put("/:id", async (req, res) => {
  try {
    const updated = await knex("meals").where({ id: req.params.id }).update(req.body);
    if (!updated) {
      return res.status(404).json({ error: "Meal not found" });
    }
    res.json({ message: "Meal updated" });
  } catch (error) {
    console.error("Error updating meal:", error);
    res.status(500).json({ error: "Error updating meal" });
  }
});

// ✅ DELETE /api/meals/delete/:id — Delete a meal
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await knex("meals").where({ id: req.params.id }).del();
    if (!deleted) {
      return res.status(404).json({ error: "Meal not found" });
    }
    res.json({ message: "Meal deleted" });
  } catch (error) {
    console.error("Error deleting meal:", error);
    res.status(500).json({ error: "Error deleting meal" });
  }
});

export default router;
