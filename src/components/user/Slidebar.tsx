import { useLocation, useHistory } from 'react-router-dom';
import styles from "./Menu.module.scss";

function Slidebar() {
  const location = useLocation();
  const history = useHistory();

  return (
    <div className={styles.slidebar}>
      <div className={styles.baritemlayout}>
        <h1 
          className={location.pathname === "/user/detail" ? `${styles.baritem} ${styles.active}` : styles.baritem} 
          onClick={() => history.push("/user/detail")}
        >
          식당 정보
        </h1>
        <h1 
          className={location.pathname === "/user/menu" ? `${styles.baritem} ${styles.active}` : styles.baritem} 
          onClick={() => history.push("/user/menu")}
        >
          메뉴
        </h1>
        <h1 
          className={location.pathname === "/review" ? `${styles.baritem} ${styles.active}` : styles.baritem} 
          onClick={() => history.push("/user/review")}
        >
          후기
        </h1>
      </div>
    </div>
  );
}

export default Slidebar;
