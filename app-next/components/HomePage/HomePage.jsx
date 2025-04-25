"use client";
import MealsList from '../MealsList/MealsList';
import Link from "next/link";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div style={{ padding: "2rem" }}>
      <header>
        <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <img src="/logo.png" alt="Meal Sharing Logo" width="100" />
          <div>
            <Link href="/">Home</Link> | <Link href="/meals">Meals</Link>
          </div>
        </nav>
        <h1 >Welcome to Meal Sharing</h1>
        <p>Find meals near you and share your favorites!</p>
      </header>

      <section>
        <h2>Featured Meals</h2>
        <MealsList limit={3} />
        <Link href="/meals">
          <button style={{ marginTop: "1rem" }}>See all meals</button>
        </Link>
      </section>

      <footer style={{ marginTop: "2rem", borderTop: "1px solid #ccc", paddingTop: "1rem" }}>
        <p>© 2025 Meal Sharing</p>
      </footer>
    </div>
  );
}
