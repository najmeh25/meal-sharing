
import knex from "../database.js";
import "dotenv/config";
import express from "express";
import db from "../database.js"; 

const app = express();

const PORT = process.env.PORT || 3000;
const router = express.Router();
app.use(express.json());
app.use(express.urlencoded({extended:true}));


router.post("/",async(req,res)=>{
console.log(req.body);
res.json(req.body);
})



export default router;