import Slidebar from "../user/Slidebar";
import styles from "./Review.module.scss";

function Review() {
  return (
    <div className={styles.container}>
      <Slidebar />
      <div className={styles.right}>
      <div className={styles.reviewContainer}></div>
      <div className={styles.reviewContainer}></div>
      <div className={styles.reviewContainer}></div>
      <div className={styles.reviewContainer}></div>
      <div className={styles.reviewContainer}></div>
      <div className={styles.reviewContainer}></div>
        </div>

    </div>
  );
}

export default Review;
