"use client";
import MealsList from "../../components/MealsList/MealsList";


export default function MealsPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{textAlign:"center",color:"#a0a2a3",paddingBottom:"30px" }}>All Meals</h1>
      <MealsList />
    </div>
  );
}

