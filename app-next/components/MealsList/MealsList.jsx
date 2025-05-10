"use client";
import { useEffect, useState } from "react";
import styles from "./MealsList.module.css";
import Meal from "./Meal";
import Link from "next/link";
import SearchBox from "../SearchBox";
import SortControl from "../SortControl";

function MealsList({ limit }) {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("title");
  const [sortDir, setSortDir] = useState("asc");
  const [error, setError] = useState(null);

  const fetchMeals = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/meals?title=${query}&sortKey=${sortKey}&sortDir=${sortDir}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch meals");
      }

      const result = await response.json();
      if (limit) {
        setData(result.slice(0, limit));
      } else {
        setData(result);
      }

      setError(null);
    } catch (err) {
      console.error("Error fetching meals:", err);
      setError("Could not load meals. Please try again later.");
    }
  };

  // useEffect با setInterval برای بروزرسانی لیست غذاها هر 5 ثانیه
  useEffect(() => {
    fetchMeals(); // بار اول

    const intervalId = setInterval(() => {
      fetchMeals();
    }, 5000);

    return () => clearInterval(intervalId); // پاک‌سازی interval در unmount
  }, [limit, query, sortKey, sortDir]);

  return (
    <div className={styles.mealsContainer}>
      <div className={styles.controlsContainer}>
        <SearchBox onSearch={(text) => setQuery(text)} />
        <SortControl
          sortKey={sortKey}
          setSortKey={setSortKey}
          sortDir={sortDir}
          setSortDir={setSortDir}
        />
      </div>

      <div className={styles.mealsList}>
        {error ? (
          <p className={styles.error}>{error}</p>
        ) : data.length > 0 ? (
          data.map((meal) => (
            <div key={meal.id} className={styles.mealCard}>
              <Meal mealId={meal.id} />
              <Link href={`/meals/${meal.id}`}>
                <button className={styles.detailsButton}>View Details</button>
              </Link>
            </div>
          ))
        ) : (
          <p>Loading meals...</p>
        )}
      </div>
    </div>
  );
}

export default MealsList;
