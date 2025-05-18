"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReviewForm from "@/components/MealsList/ReviewForm";
import styles from "./Meals.module.css";

export default function MealDetailsPage() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    number_of_guests: 1,
    name: "",
    email: "",
    phonenumber: "",
  });
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [reservationError, setReservationError] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function fetchMealAndReviews() {
      try {
        const [mealRes, reviewsRes] = await Promise.all([
          fetch(`http://localhost:4000/api/meals/${id}`),
          fetch(`http://localhost:4000/api/reviews/meals/${id}/reviews`),
        ]);
        if (!mealRes.ok || !reviewsRes.ok) throw new Error("Failed to fetch");
        const mealData = await mealRes.json();
        const reviewsData = await reviewsRes.json();
        setMeal(mealData);
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching meal or reviews:", error);
      }
    }

    fetchMealAndReviews();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "number_of_guests" ? Number(value) : value,
    }));
  };

  const handleReservation = async (e) => {
    e.preventDefault();
    if (!meal) return;

    if (formData.number_of_guests > meal.available_reservations) {
      setReservationError(`Only ${meal.available_reservations} seats available.`);
      setReservationSuccess(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meal_id: meal.id,
          user_id: 1,
          number_of_guests: formData.number_of_guests,
          name: formData.name,
          email: formData.email,
          phonenumber: formData.phonenumber,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Reservation failed");
      }

      setReservationSuccess(true);
      setReservationError(null);
      setFormData({ number_of_guests: 1, name: "", email: "", phonenumber: "" });
    } catch (error) {
      setReservationError(error.message);
      setReservationSuccess(false);
    }
  };

  if (!meal) return <p className={styles.loading}>Loading meal details...</p>;

  return (
    <div className={styles.container}>
      <h1>{meal.title}</h1>
      <p>{meal.description}</p>
      <p><strong>Max reservations:</strong> {meal.max_reservations}</p>
      <p><strong>Price:</strong> {meal.price} kr</p>

      <h2>Make a Reservation</h2>
      {meal.available_reservations > 0 ? (
        <form className={styles.form} onSubmit={handleReservation}>
          <label>
            Number of guests:
            <input type="number" name="number_of_guests" value={formData.number_of_guests}
              min="1" max={meal.available_reservations} onChange={handleChange} required />
          </label>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
          <label>
            Phone number:
            <input type="text" name="phonenumber" value={formData.phonenumber} onChange={handleChange} required />
          </label>
          <button type="submit">Book seat</button>
        </form>
      ) : (
        <p>No reservations available for this meal.</p>
      )}

      {reservationSuccess && <p className={styles.success}>Reservation successful!</p>}
      {reservationError && <p className={styles.error}>{reservationError}</p>}

      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        <ul className={styles.reviewList}>
          {reviews.map((review) => (
            <li key={review.id}>
              <strong>⭐ {review.stars}</strong> - {review.description}<br />
              <small>{new Date(review.created_date).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet for this meal.</p>
      )}

      <h2>Leave a Review</h2>
      <ReviewForm mealId={meal.id} userId={1} />
    </div>
  );
}
