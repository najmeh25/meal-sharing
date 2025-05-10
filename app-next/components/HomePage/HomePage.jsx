"use client";
import MealsList from '../MealsList/MealsList';
import Link from "next/link";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div style={{ padding: "2rem" }}>
      <header>
       
        <h1 style={{textAlign:"center" }}>Welcome to Meal Sharing</h1>
        <p style={{textAlign:"center" }}>Find meals near you and share your favorites!</p>
      </header>

      <section>
        <h2 style={{textAlign:"center"}}>Featured Meals</h2>
        <MealsList limit={3} />
        <Link href="/meals">
          <button style={{marginLeft:"40%",marginTop:"30px",padding:"20px 50px",borderRadius:"15px",border:"none",backgroundColor:"#babbbc" }}>See all meals</button>
        </Link>
      </section>

     

    </div>
  );
}
