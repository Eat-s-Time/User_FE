import { useHistory, useLocation } from "react-router";
import styles from "./Mypage.module.scss";

function Mypage() {
  const location = useLocation();
  const history = useHistory();

  return (
    <div className={styles.container}>
      <div>
        <h1>양하연</h1>
        <h1>예약 내역</h1>
        <h1>내 정보 수정</h1>
      </div>
    </div>
  );
}

export default Mypage;
