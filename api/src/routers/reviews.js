
import knex from "../database.js";
import "dotenv/config";
import express from "express";
import db from "../database.js"; 
import  Knex  from "knex";
import "dotenv/config";
const app = express();

const PORT = process.env.PORT || 3000;
const router = express.Router();


// Get all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await knex("reviews").select("*");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Error fetching reviews" });
  }
});


//Returns all reviews for a specific meal.
router.get("/meals/:meal_id/reviews", async (req, res) => {
  const { meal_id } = req.params;
  try {
    const reviews = await knex("reviews").where("meal_id", meal_id); 
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Error fetching reviews for meal" });
  }
});

//Adds a new review to the database.
router.post("/", async (req, res) => {
  const { meal_id, user_id, stars, description, created_date } = req.body; 
  try {
    const [id] = await knex("reviews").insert({ meal_id, user_id, stars, description, created_date }); 
    res.status(201).json({ message: "Review added", id });
  } catch (error) {
    res.status(500).json({ error: "Error adding review" });
  }
});



//Returns a review by id.
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
    res.status(500).json({ error: "Error fetching review" });
  }
});

//Updates the review by id.
router.put("/:id", async (req,res)=>{
  const {id}=req.params;
  const {meal_id,user_id,stars,description,created_date}=req.body;
  try {
    const update= await knex("reviews").where({id}).update({meal_id,user_id,stars,description,created_date});
    if(update){
   res.send({message:"Review updated"})
    }  else  {
      return res.status(404).json({error:"Review not found"});}

  } catch (error) {
   res.status(500).json({error:"Error updating review"})  }
});

//Deletes the review by id.
router.delete("/:id", async (req,res)=>{
  const {id}=req.params;

  try {
    const deleted=await knex("reviews").where({id}).del();
    if (deleted){
      res.json({message:"Reviews deleted"})
    }else{
      return res.json({error:"Review not found"})
    }
    
  } catch (error) {
    res.status(500).json({error:"ERROR deleting reviews"})
  }
})






export default router;