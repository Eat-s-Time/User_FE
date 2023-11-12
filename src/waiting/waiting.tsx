import React, { useState } from "react";
import styles from "./waiting.module.scss";
import { useHistory } from "react-router";
import { useSetRecoilState } from "recoil";
import { adultCountState, childCountState, storeState } from "../recoil/atom";

function Waiting() {
  const [adultCount, setAdultCount] = useState(1); // 성인 수 상태
  const [childCount, setChildCount] = useState(0); // 유아 수 상태
  const history = useHistory();
  const setAdultAtom = useSetRecoilState(adultCountState);
  const setChildAtom = useSetRecoilState(childCountState);



  const handleBooking = () => {
    if (
      window.confirm(
        `성인 ${adultCount}명, 유아 ${childCount}명으로 대기를 신청하시겠습니까?`
      )
    ) {
      //recoil atom에 인원과 식당 정보 저장
      setAdultAtom(adultCount);
      setChildAtom(childCount);
      history.push("/user/waitingCheck");
    }
  };

  //백엔드 통신


  //

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>방문 인원을 선택하세요</h1>
      <div className={styles.adultLayout}>
        <h1 className={styles.person}>성인</h1>
        <div className={styles.personLayout}>
          <div
            className={styles.plusbtn}
            onClick={() => setAdultCount((prev) => Math.max(prev - 1, 1))}>
            {" "}
            -
          </div>
          <h1>{adultCount}</h1>
          <div
            className={styles.plusbtn}
            onClick={() => setAdultCount((prev) => prev + 1)}>
            +
          </div>
        </div>
      </div>

      <div className={styles.adultLayout}>
        <h1 className={styles.person}>유아</h1>
        <div className={styles.personLayout}>
          <div
            className={styles.plusbtn}
            onClick={() => setChildCount((prev) => Math.max(prev - 1, 0))}>
            {" "}
            -
          </div>
          <h1>{childCount}</h1>
          <div
            className={styles.plusbtn}
            onClick={() => setChildCount((prev) => prev + 1)}>
            +
          </div>
        </div>
      </div>

      <div className={styles.bookbtn} onClick={handleBooking}>
        다음
      </div>
    </div>
  );
}

export default Waiting;
