"use client";
import styles from "./AboutPage.module.css"; 

export default function AboutPage() {
  return (
    <div className={styles.aboutContainer}>
      <h1>About Us</h1>
      <img
        src="/res.jpeg"
        alt="Our Restaurant"
        className={styles.restaurantImage}
      />
      <p className={styles.description}>
        At Meal Sharing, we believe food is better when it’s shared. Our mission is
        to connect people through delicious meals and memorable experiences.
        Whether you're hosting or joining, every meal brings a new story.
      </p>
    </div>
  );
}
