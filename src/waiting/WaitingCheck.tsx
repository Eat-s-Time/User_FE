import styles from "./waitingcheck.module.scss";
import { useHistory } from "react-router";
import { useRecoilValue } from 'recoil';
import { adultCountState, childCountState, storeState } from "../recoil/atom";


function WaitingCheck() {
  const adultCount = useRecoilValue(adultCountState);
  const childCount = useRecoilValue(childCountState);
  const store = useRecoilValue(storeState);
  const history = useHistory();
  const waitingNumber = 3;

//해당 코드는 localhost:3000번입니다. 
  const handleBooking = () => {
    if (window.confirm(`대기를 신청하시겠습니까?`)) {
        //localhost:3001/waiting/{id}로 웨이팅 정보 바로 전송하는 코드 추가

      history.push("/user/waitingOK"); 
    }
  };
  return (
    <>
      <div className={styles.container}>
      <h1 className={styles.title}>현재 <span className={styles.orangeText}>{waitingNumber}</span>팀 대기중</h1>
      <h1 className={styles.title}>예상대기 시간 <span className={styles.orangeText}>{waitingNumber}</span>분</h1>
        <div className={styles.waitingbox}>
          <div className={styles.subdiv}>
            <div className={styles.subtitle}>매장명</div>
            <div className={styles.summary}>{store}</div>
          </div>
          <div className={styles.subdiv}>
            <div className={styles.subtitle}>인원</div>
            <div className={styles.summary}>성인 {adultCount}명 유아 {childCount}명</div>
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
