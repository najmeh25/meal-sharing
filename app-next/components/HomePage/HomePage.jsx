import React from 'react';
import styles from "./HomePage.css";

import MealsList from '../MealsList/MealsList';



const HomePage = () => {
  return (
    <div >
      <h1 style={{color:"green",textAlign:"center"}}>Welcome to Meal Sharing</h1>
  <MealsList />
    </div>
  );
};

export default HomePage;
