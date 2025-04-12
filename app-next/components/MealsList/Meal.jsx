import styles from "./Meal.module.css";

function Meal({ meal }) {
  return (
    <div className={styles.mealCard}>
             <h4 className={styles.mealTitle}>{meal.title}</h4>
      <p className={styles.mealDescription}>{meal.description}</p>
      <p className={styles.mealPrice}>Price: ${meal.price}</p>
      <button className={styles.reserveButton}>Reserve</button>
    </div>
  );
}

export default Meal;
