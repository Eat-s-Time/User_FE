import { useHistory } from "react-router";
import Slidebar from "../user/Slidebar";
import styles from "./Review.module.scss";
import { useEffect } from "react";

function Review() {
  const history = useHistory();
  useEffect(() => {
    return history.listen((location) => { 
      if (history.action === 'POP') {
        history.push('/user/main');
      }
    }) 
  }, [history])
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
