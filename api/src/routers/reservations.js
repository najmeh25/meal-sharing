import express from "express";
import knex from "../database.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const reservations = await knex("reservations").select("*");
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving reservations" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const reservation = await knex("reservations").where({ id: req.params.id }).first();
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving reservation" });
  }
});


router.post("/", async (req, res) => {
  try {
    const { meal_id, user_id, number_of_guests, name, email, phonenumber } = req.body;

   
    if (!meal_id || !user_id || !number_of_guests || !name || !email || !phonenumber) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const meal = await knex("meals").where({ id: meal_id }).first();
    if (!meal) {
      return res.status(404).json({ error: "Meal not found" });
    }

    
    const totalGuestsResult = await knex("reservations")
      .where({ meal_id })
      .sum("number_of_guests as totalGuests");
    const totalGuests = totalGuestsResult[0].totalGuests || 0;

    if (meal.max_reservations && totalGuests + number_of_guests > meal.max_reservations) {
      return res.status(400).json({ error: "Not enough seats available" });
    }

    
    const [newId] = await knex("reservations").insert({
      meal_id,
      user_id,
      number_of_guests,
      name,
      email,
      phonenumber,
      created_date: new Date(),
    });

    res.status(201).json({ message: "Reservation created", id: newId });
  } catch (error) {
    res.status(500).json({ error: "Error creating reservation", detail: error.message });
  }
});




export default router;
