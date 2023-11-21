import styles from "./Review.module.scss";

function Review() {
  return (
    <div className={styles.container}>
      <div className={styles.reviewContainer}></div>
      <div className={styles.reviewContainer}></div>
      <div className={styles.reviewContainer}></div>
      <div className={styles.reviewContainer}></div>
      <div className={styles.reviewContainer}></div>
      <div className={styles.reviewContainer}></div>
    </div>
  );
}

export default Review;
