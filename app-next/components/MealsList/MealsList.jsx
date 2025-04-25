"use client";
import { useEffect, useState } from "react";
import styles from "./MealsList.module.css";
import Meal from "./Meal";
import Link from "next/link";

function MealsList({ limit }) {
  const [data, setData] = useState(null);
  

  const fetchMeals = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/meals");
      if (!response.ok) {
        throw new Error("Failed to fetch meals");
      }
      const result = await response.json();

      if (limit) {
        setData(result.slice(0, limit));
      } else {
        setData(result);
      }
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, [limit]);

  return (
    <div className={styles.mealsContainer}>
      {data ? (
        data.map((meal) => (
          <div key={meal.id} className={styles.mealCard}>
            <Meal meal={meal} />
            <Link href={`/meals/${meal.id}`}>
              <button className={styles.detailsButton}>View Details</button>
            </Link>
          </div>
        ))
      ) : (
        <p>Loading meals...</p>
      )}
    </div>
  );
}

export default MealsList;
