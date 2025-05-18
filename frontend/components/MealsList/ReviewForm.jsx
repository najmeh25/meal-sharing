import React, { useState } from "react";
import styles from "./ReviewForm.module.css";
const ReviewForm = ({ mealId, userId }) => {
  const [stars, setStars] = useState(5);
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!mealId || !userId) {
      setError("Meal ID or User ID is missing.");
      return;
    }

    if (stars < 1 || stars > 5) {
      setError("Stars must be between 1 and 5.");
      return;
    }

    if (!description.trim()) {
      setError("Description cannot be empty.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meal_id: mealId,
          user_id: userId,
          stars,
          description,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit review");
      }

      setSuccess(true);
      setStars(5);
      setDescription("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
      <h3 style={{ color: "blue" }}>Leave a Review</h3>

      <label>
        Stars (1-5):{" "}
        <input
          type="number"
          value={stars}
          onChange={(e) => setStars(parseInt(e.target.value, 10))}
          min={1}
          max={5}
          required
        />
      </label>

      <br />

      <label>
        Description:{" "}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          cols={30}
        />
      </label>

      <br />
      <br />

      <button
        type="submit"
        style={{
          marginTop: "40px",
          marginLeft: "20px",
          backgroundColor: "#1976d2",
          color: "white",
          border: "none",
          borderRadius: "4px",
          textAlign: "center",
          padding: "10px 20px",
          cursor: "pointer",
          textDecoration: "none",
        }}
      >
        Submit Review
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && (
        <p style={{ color: "green" }}>Review submitted successfully!</p>
      )}
    </form>
  );
};

export default ReviewForm;
