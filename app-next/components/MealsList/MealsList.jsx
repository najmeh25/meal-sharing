"use client";
import { useEffect, useState } from "react";
import styles from "./MealsList.module.css";
import Meal from "./Meal";

function MealsList() {
  const [data, setData] = useState(null);

  const fetchMeals = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/meals");
      if (!response.ok) {
        throw new Error("Failed to fetch meals");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <div className={styles.mealsContainer}>
      {data ? (
        data.map((meal) => (
          <div key={meal.id} className={styles.mealCard}>
            <Meal meal={meal} />
          </div>
        ))
      ) : (
        <p>Loading meals...</p>
      )}
    </div>
  );
}

export default MealsList;
