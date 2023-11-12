import styles from "./waitingcheck.module.scss";
import { useHistory } from "react-router";


function WaitingOk() {
  const history = useHistory();

  const handleBooking = () => {
      history.push("/user/main"); 
    }

  return (
    <div className={styles.container}>
    <h1 className={styles.title}>웨이팅 신청을 완료했습니다!</h1>
    <h1 className={styles.title}>메일 알림이 오면 매장 앞에서 대기해주세요.</h1>

      <div className={styles.bookbtn} onClick={handleBooking}>홈으로</div>
    </div>
  );
};
export default WaitingOk;
