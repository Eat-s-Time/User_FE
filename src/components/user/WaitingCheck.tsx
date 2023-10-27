import React, { useState } from "react";
import styles from "./waitingcheck.module.scss";
import { useHistory } from "react-router";

function WaitingCheck() {
  const [adultCount, setAdultCount] = useState(1); // 성인 수 상태
  const [childCount, setChildCount] = useState(0); // 유아 수 상태
  const history = useHistory();
  const waitingNumber = 3;


  const handleBooking = () => {
    if (window.confirm(`대기를 신청하시겠습니까?`)) {
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
            <div className={styles.summary}>후야</div>
          </div>
          <div className={styles.subdiv}>
            <div className={styles.subtitle}>인원</div>
            <div className={styles.summary}>성인 1명 유아 1명</div>
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
