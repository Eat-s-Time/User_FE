import styles from "./ReviewOk.module.scss";
import { useHistory } from "react-router";

function ReviewOk() {
  const history = useHistory();

  const handleBooking = () => {
    history.push("/user/main");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>리뷰를 작성해주셔서 감사합니다.</h1>
      <h1 className={styles.title}>
        더욱 노력하는 짬뽕 잘하는 집이 되겠습니다 감사합니다.
      </h1>

      <div className={styles.bookbtn} onClick={handleBooking}>
        홈으로
      </div>
    </div>
  );
}
export default ReviewOk;
