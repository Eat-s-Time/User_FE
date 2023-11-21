import styles from "./waitingcheck.module.scss";
import { useHistory } from "react-router";
import { useRecoilValue } from "recoil";
import { adultCountState, childCountState, storeState } from "../recoil/atom";
import Socket from "../socket/socket";

function WaitingCheck() {
  const adultCount = useRecoilValue(adultCountState);
  const childCount = useRecoilValue(childCountState);
  const store = useRecoilValue(storeState);
  const history = useHistory();
  const waitingNumber = 3;
  const userId = "hayun4475";
  const restaurantId = 'toyo';




  const handleBooking = () => {
    if (window.confirm(`대기를 신청하시겠습니까?`)) {
      try {
        Socket({ adultCount, childCount, store,userId, restaurantId });
        // history.push("/user/waitingok");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>
          현재 <span className={styles.orangeText}>{waitingNumber}</span>팀
          대기중
        </h1>
        <h1 className={styles.title}>
          예상대기 시간{" "}
          <span className={styles.orangeText}>{waitingNumber}</span>분
        </h1>
        <div className={styles.waitingbox}>
          <div className={styles.subdiv}>
            <div className={styles.subtitle}>매장명</div>
            <div className={styles.summary}>{store}</div>
          </div>
          <div className={styles.subdiv}>
            <div className={styles.subtitle}>인원</div>
            <div className={styles.summary}>
              성인 {adultCount}명 유아 {childCount}명
            </div>
          </div>
        </div>
        <div className={styles.bookbtn} onClick={handleBooking}>
          신청하기
        </div>
      </div>
    </>
  );
}

export default WaitingCheck;
