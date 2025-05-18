
import knex from "../database.js";
import "dotenv/config";
import express from "express";
import db from "../database.js"; 
const app = express();
const PORT = process.env.PORT || 3000;
const router = express.Router();


router.get("/", async (req, res) => {
    try {
        console.log(req.query);
        const { maxPrice,availableReservations,title,dateAfter,dateBefore,limit,sortKey,sortDir} = req.query;
                 let query = knex('meals')
            .leftJoin('reservations', 'meals.id', 'reservations.meal_id')  
            .select('meals.*', knex.raw('COUNT(reservations.id) as reservations_count'))
            .groupBy('meals.id');
                           
       // maxPrice filter
         if (maxPrice) {
            query = query.where('price', '<', maxPrice);
          }

         // availableReservations filter
        if (availableReservations === 'true') {
            query = query.having(knex.raw('COUNT(reservations.id) < meals.max_reservations'));
        } else if (availableReservations === 'false') {
            query = query.having(knex.raw('COUNT(reservations.id) >= meals.max_reservations'));
        }


        // title filter (partial match)
        if (title) {
            query = query.where('title', 'like', `%${title}%`);
        }

        // dateAfter filter
        if (dateAfter) {
            query = query.where('when', '>', dateAfter);
        }

        // dateBefore filter
        if (dateBefore) {
            query = query.where('when', '<', dateBefore);
        }

       // limit
        if (limit) {
            query = query.limit(limit);
        }
         
         // Sorting
        if (sortKey) {
            const direction = sortDir || 'asc';  
            query = query.orderBy(sortKey, direction);
        }

        
        console.log(query.toString());  

        const meal= await query;
        console.log(meal);  
        res.json(meal);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching meals' });
    }
});

export default router;