import express from "express";
import knex from "../database.js";
import "dotenv/config";

const router = express.Router();

// Get all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await knex("reviews").select("*");
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Error fetching reviews" });
  }
});

// Get all reviews for a specific meal
router.get("/meals/:meal_id/reviews", async (req, res) => {
  const { meal_id } = req.params;
  try {
    const reviews = await knex("reviews").where("meal_id", meal_id);
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews for meal:", error);
    res.status(500).json({ error: "Error fetching reviews for meal" });
  }
});

// Add a new review
router.post("/", async (req, res) => {
  try {
    const { meal_id, user_id, stars, description } = req.body;

    if (!meal_id || !user_id || !stars || !description) {
      console.log("❌ Missing required fields:", req.body);
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log("📤 Inserting review:", { meal_id, user_id, stars, description });

    // Insert review and get inserted id
    const [id] = await knex("reviews").insert({
      meal_id,
      user_id,
      stars,
      description,
      created_date: new Date(),
    });

    res.status(201).json({ success: true, id });
  } catch (error) {
    console.error("❌ Error inserting review:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a review by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const review = await knex("reviews").where("id", id).first();
    if (review) {
      res.json(review);
    } else {
      res.status(404).json({ error: "Review not found" });
    }
  } catch (error) {
    console.error("Error fetching review:", error);
    res.status(500).json({ error: "Error fetching review" });
  }
});

// Update a review by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { meal_id, user_id, stars, description, created_date } = req.body;

  try {
    const updated = await knex("reviews")
      .where({ id })
      .update({ meal_id, user_id, stars, description, created_date });

    if (updated) {
      res.json({ message: "Review updated" });
    } else {
      res.status(404).json({ error: "Review not found" });
    }
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ error: "Error updating review" });
  }
});

// Delete a review by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await knex("reviews").where({ id }).del();
    if (deleted) {
      res.json({ message: "Review deleted" });
    } else {
      res.status(404).json({ error: "Review not found" });
    }
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ error: "Error deleting review" });
  }
});

export default router;
