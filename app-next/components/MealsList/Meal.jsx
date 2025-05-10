import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Meal.module.css";

function Meal({ mealId }) {
  const [meal, setMeal] = useState(null);
  const [availableSpots, setAvailableSpots] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMealData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:4000/api/meals/${mealId}`);
      if (!response.ok) {
        throw new Error("Meal not found");
      }
      const data = await response.json();
      setMeal(data);
      setAvailableSpots(data.available_reservations);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReserve = async () => {
    if (availableSpots <= 0) {
      alert("No available spots left!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/meals/${mealId}/reserve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mealId }),
      });

      if (response.ok) {
        alert("Reservation successful!");
        fetchMealData(); // Refresh data after reservation
      } else {
        alert("Failed to reserve. Please try again.");
      }
    } catch (error) {
      alert("Error occurred while reserving.");
    }
  };

  useEffect(() => {
    if (!mealId) return;
    fetchMealData(); // initial load only
  }, [mealId]);

  if (!mealId) return null;

  return (
    <div className={styles.mealCard}>
      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {meal && (
        <>
          {meal.image_url && (
            <img
              src={meal.image_url}
              alt={meal.title}
              className={styles.mealImage}
            />
          )}
          <h4 className={styles.mealTitle}>{meal.title}</h4>
          <p className={styles.mealDescription}>{meal.description}</p>
          <p className={styles.mealPrice}>Price: ${meal.price}</p>

          <p
            className={
              availableSpots > 0 ? styles.availableSpots : styles.fullyBooked
            }
          >
            {availableSpots > 0
              ? `Available spots: ${availableSpots}`
              : "Fully booked"}
          </p>

          <Link href={`/meals/${mealId}`}>
            <button className={styles.detailsButton}>Reserve</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Meal;
