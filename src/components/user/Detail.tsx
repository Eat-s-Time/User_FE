import { useHistory } from "react-router-dom";
import Slidebar from "./Slidebar";
import styles from "./Detail.module.scss";
import { storeIdState, storeState } from "../../recoil/atom";
import {useSetRecoilState } from "recoil";
import axios from "axios";
import { useEffect } from "react";

function Detail() {
  const history = useHistory();
  const storeAtom =  useSetRecoilState(storeState);
  const storeIdAtom =  useSetRecoilState(storeIdState);
  




  const handleBooking = () => {
    if (window.confirm(`${resInfo[0].waiting}팀이 대기중입니다. 대기를 신청하시겠습니까?`)) {
      storeAtom(resInfo[0].name);
      console.log(storeAtom);
      history.push("/user/waiting"); // 확인 버튼을 누르면 "/waiting" 페이지로 이동합니다.
    }
  };
  const path = window.location.pathname; // URL의 경로 부분을 가져옴
  const segments = path.split('/'); // '/'를 기준으로 분할
  const storeId = Number(segments.pop()); // 맨 마지막 요소를 제거하고 반환

useEffect(() => {
  storeIdAtom(storeId);
})

  const getresInfo = () => {

    try {
      const response = axios.get(`http://localhost:9000/owner/${storeId}`)
    console.log(response);
    } catch (error) {
      console.log("에러가 빨간색이고 뜨겁누 ㅋㅋ");
      console.log( error);
      
    }
  };
  
  useEffect(() => {
    getresInfo();
  });

  const resInfo = [
    {
      name: "요우",
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      cate: "일식",
      txt: "호텔 일식당 출신 오너 셰프의 코스요리 일식 전문점",
      address: "서울특별시 강남구 논현로 20길 22 1층",
      time: "10:00 ~ 23:00",
      phone: "02-577-9074",
      waiting: 12,
    },
  ];

  return (
    <div className={styles.container}>
      <Slidebar />
      <div className={styles.right}>
        <div
          style={{
            backgroundImage: `url("https://itimgstorage.blob.core.windows.net/source/img.jpg")`,
          }}
          className={styles.Bannerpic}></div>

        <div className={styles.logoBanner}>
        <img src="/assets/img/logo.png" alt="Logo" className={styles.logo} />
          <div className={styles.details}>
            <h1 className={styles.menuname}>{resInfo[0].name}</h1>
            <p className={styles.txt}>{resInfo[0].cate}</p>
            <p className={styles.txt}>{resInfo[0].txt}</p>
          </div>
          <div className={styles.bookbtn} onClick={handleBooking}>대기하기</div>
        </div>
        <div className={styles.infolayout}>
          <p className={styles.infoLogo}>영업 정보</p>
          <p className={styles.info}>주소: {resInfo[0].address}</p>
          <p className={styles.info}>영업 시간: {resInfo[0].time}</p>
          <p className={styles.info}>전화번호: {resInfo[0].phone}</p>
        </div>
      </div>
    </div>
  );
}

export default Detail;
