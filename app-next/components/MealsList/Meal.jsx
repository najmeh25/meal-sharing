
import Link from "next/link";
import styles from "./Meal.module.css";

function Meal({ meal }) {
  return (
    <div className={styles.mealCard}>
      <h4 className={styles.mealTitle}>{meal.title}</h4>
      <p className={styles.mealDescription}>{meal.description}</p>
      <p className={styles.mealPrice}>Price: ${meal.price}</p>
      
      <Link href={`/meals/${meal.id}`}>
  <button className={styles.detailsButton}>Reserve</button>
      </Link>

    </div>
  );
}

export default Meal;

