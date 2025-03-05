import express from "express";
import knex from "../database.js";

const router = express.Router();




//Get All reservations
router.get("/", async (req, res) => {
    try {
      const reservation = await knex("reservations").select("*");
      res.json(reservation);
    } catch (error) {
      res.status(500).json({ error: "An error occurred while retrieving reservations" });
    }
  });

  //Get a Specific reservations by ID
  router.get("/:id", async (req, res) => {
    try {
      const Reservation = await knex("reservations").where({ id: req.params.id }).first();
      if (!Reservation) {
        return res.status(404).json({ error: "Reservation not found" });
      }
      res.json(Reservation);
    } catch (error) {
      res.status(500).json({ error: "An error occurred while retrieving the reservation" });
    }
  });


  //Create a New reservations
  router.post("/", async (req, res) => {
    try {
      const newReservation = await knex("reservations").insert(req.body);
      res.status(201).json({ message: "reservation successfully added", id: newReservation[0] });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while creating the reservation" });
    }
  });

  // Update an Existing reservations
  router.put("/:id", async (req, res) => {
    try {
      const updatedRows = await knex("reservations").where({ id: req.params.id }).update(req.body);
      if (updatedRows === 0) {
        return res.status(404).json({ error: "reservation not found or no changes made" });
      }
      res.json({ message: "reservation successfully updated" });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while updating the reservation" });
    }
  });
  
  // Delete a reservations
  router.delete("/:id", async (req, res) => {
    try {
      const deletedRows = await knex("reservations").where({ id: req.params.id }).del();
      if (deletedRows === 0) {
        return res.status(404).json({ error: "reservation not found" });
      }
      res.json({ message: "reservation successfully deleted" });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while deleting the reservation" });
    }
  });

  


export default router;
