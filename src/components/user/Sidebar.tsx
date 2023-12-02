import { useLocation, useHistory } from "react-router-dom";
import styles from "./Menu.module.scss";
import { useRecoilValue } from "recoil";
import { storeIdState } from "../../recoil/atom";
import { MdOutlineMenu, MdOutlineRateReview } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";

function Slidebar() {
  const location = useLocation();
  const history = useHistory();
  const storeId = useRecoilValue(storeIdState);

  return (
    <div className={styles.slidebar}>
      <div className={styles.baritemlayout}>
        <img className={styles.logo} onClick={() => history.push(`/user/main`)} src="/assets/img/smallLogo.png"/> 
        <div className={styles.slidebarBox}>
          <TbListDetails
            className={
              location.pathname === `/user/detail/${storeId}`
                ? `${styles.baritem} ${styles.active}`
                : styles.baritem
            }
            onClick={() => history.push(`/user/detail/${storeId}`)}
          />
          <h1
            className={
              location.pathname === `/user/detail/${storeId}`
                ? `${styles.baritem} ${styles.active}`
                : styles.baritem
            }
            onClick={() => history.push(`/user/detail/${storeId}`)}>
            식당 정보
          </h1>
        </div>

        <div className={styles.slidebarBox}>
          <MdOutlineMenu
            className={
              location.pathname === `/user/menu/${storeId}`
                ? `${styles.baritem} ${styles.active}`
                : styles.baritem
            }
          />
          <h1
            className={
              location.pathname === `/user/menu/${storeId}`
                ? `${styles.baritem} ${styles.active}`
                : styles.baritem
            }
            onClick={() => history.push(`/user/menu/${storeId}`)}>
            메뉴
          </h1>
        </div>
        <div className={styles.slidebarBox}>
          <MdOutlineRateReview
            className={
              location.pathname === `/user/review/${storeId}`
                ? `${styles.baritem} ${styles.active}`
                : styles.baritem
            }
            onClick={() => history.push(`/user/review/${storeId}`)}
          />
          <h1
            className={
              location.pathname === `/user/review/${storeId}`
                ? `${styles.baritem} ${styles.active}`
                : styles.baritem
            }
            onClick={() => history.push(`/user/review/${storeId}`)}>
            후기
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Slidebar;
