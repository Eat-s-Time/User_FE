import { useHistory, useLocation } from "react-router";
import styles from "./Mypage.module.scss";


function Mypage() {

    const location = useLocation();
    const history = useHistory();
  
    return (
      <div className={styles.slidebar}>
        <div className={styles.baritemlayout}>
          <h1 
            className={location.pathname === "/user/detail" ? `${styles.baritem} ${styles.active}` : styles.baritem} 
            onClick={() => history.push("/user/detail")}
          >
             양하연
          </h1>
          <h1 
            className={location.pathname === "/user/menu" ? `${styles.baritem} ${styles.active}` : styles.baritem} 
            onClick={() => history.push("/user/menu")}
          >
            예약 내역
          </h1>
          <h1 
            className={location.pathname === "/review" ? `${styles.baritem} ${styles.active}` : styles.baritem} 
            onClick={() => history.push("/user/review")}
          >
            내 정보 수정
          </h1>
        </div>
      </div>
    );
  }

export default Mypage;