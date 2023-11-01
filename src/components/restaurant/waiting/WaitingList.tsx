import React from "react";
import styles from "./WaitingList.module.scss";

interface guestList {
  time: string;
  price: string;
  name: string;
  ranking: string;
  email: string;
}

interface WaitingListProps {
  waitingList: guestList[];
}

const WaitingList = ({ waitingList }: WaitingListProps) => {

    const guestList: guestList[] = [
        {
          time: "11:30",
          price: "성인 2 유아 0",
          name: "이하린",
          ranking: "1순위",
          email: "hllee0000@daum.net"
        },
        {
          time: "11:31",
          price: "성인 2 유아 0",
          name: "양하연",
          ranking: "2순위",
          email: "www@1234.com"
        },
        {
          time: "11:31",
          price: "성인 유아 0",
          name: "김주희",
          ranking: "3순위",
          email: "www@1234.com"
        },
      ];
  return (
    <div className={styles.background}>

    <div className={styles.container}>
      {guestList.map((waiting, index) => (
        <div className={styles.guestContainer} key={index}>
          <div className={styles.rankingContainer}>
            <p className={styles.p}>{index + 1}</p>
            <h1 className={styles.h1}>{waiting.time}</h1>
          </div>
          <div className={styles.guestInfoContainer}>
            <h1>{waiting.name}</h1>
            <h1>{waiting.price}</h1>
            <h1>{waiting.ranking}</h1>
          </div>
          <div className={styles.btnContainer}>
            <button className={styles.bookbtn}>호출</button>
            <button className={styles.bookbtn}>입장</button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default WaitingList;
