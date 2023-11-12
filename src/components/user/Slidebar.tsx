import { useLocation, useHistory } from 'react-router-dom';
import styles from "./Menu.module.scss";
import { useRecoilValue } from 'recoil';
import { storeIdState } from '../../recoil/atom';

function Slidebar() {
  const location = useLocation();
  const history = useHistory();
  const storeId = useRecoilValue(storeIdState);


  return (
    <div className={styles.slidebar}>
      <div className={styles.baritemlayout}>
        <h1 
          className={location.pathname === `/user/detail/${storeId}` ? `${styles.baritem} ${styles.active}` : styles.baritem} 
          onClick={() => history.push(`/user/detail/${storeId}`)}
        >
          식당 정보
        </h1>
        <h1 
          className={location.pathname === `/user/menu/${storeId}` ? `${styles.baritem} ${styles.active}` : styles.baritem} 
          onClick={() => history.push(`/user/menu/${storeId}`)}
        >
          메뉴
        </h1>
        <h1 
          className={location.pathname === `user/review/${storeId}` ? `${styles.baritem} ${styles.active}` : styles.baritem} 
          onClick={() => history.push(`/user/review/${storeId}`)}
        >
          후기
        </h1>

      </div>
    </div>
  );
}

export default Slidebar;
