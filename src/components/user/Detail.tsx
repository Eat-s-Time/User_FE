import { useHistory } from "react-router-dom";
import Slidebar from "./Slidebar";
import styles from "./Detail.module.scss";
import { storeIdState, storeState } from "../../recoil/atom";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { useEffect, useState } from "react";

interface StoreResponse {
  storeName: string;
  storeType: string;
  storeContent: string;
  storeLocation: string;
  openingHour: string;
  storePhone: string;
  waitingPossible: boolean;
  storeFacilities: string[];
}

interface ResInfo {
  name: string;
  img: string;
  cate: string;
  txt: string;
  address: string;
  time: string;
  phone: string;
  waiting: number;
  waitingPossible: boolean;
  storeFacilities: string[];
}

function Detail() {
  const history = useHistory();
  const storeAtom = useSetRecoilState(storeState);
  const storeIdAtom = useSetRecoilState(storeIdState);
  const [resInfo, setResInfo] = useState<ResInfo[]>([]); // 이 부분은 useState를 사용해도 됩니다.

  const handleBooking = () => {
    if (
      window.confirm(
        `${resInfo[0].waiting}팀이 대기중입니다. 대기를 신청하시겠습니까?`
      )
    ) {
      storeAtom(resInfo[0].name);
      console.log(storeAtom);
      history.push("/user/waiting"); // 확인 버튼을 누르면 "/waiting" 페이지로 이동합니다.
    }
  };
  //--------------------------------------------------------------
  const path = window.location.pathname; // URL의 경로 부분을 가져옴
  const segments = path.split("/"); // '/'를 기준으로 분할
  const storeId = Number(segments.pop()); // 맨 마지막 요소를 제거하고 반환

  useEffect(() => {
    storeIdAtom(storeId);
  });

  useEffect(() => {
    const getresInfo = async () => {
      try {
        const response = await axios.get<StoreResponse>(
          `http://localhost:9000/owner/${storeId}`
        );
        console.log(response.data);
        setResInfo([
          {
            name: response.data.storeName,
            img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
            cate: response.data.storeType,
            txt: response.data.storeContent,
            address: response.data.storeLocation,
            time: response.data.openingHour,
            phone: response.data.storePhone,
            waiting: 12,
            waitingPossible: response.data.waitingPossible,
            storeFacilities: response.data.storeFacilities,
          },
        ]);
      } catch (error) {
        console.log(error);
      }
    };
    getresInfo();
  }, [storeId]); // 의존성 배열에 storeId를 추가
  
  useEffect(() => {
    return history.listen((location) => { 
      if (history.action === 'POP') {
        history.push('/user/main');
      }
    }) 
  }, [history])
  return (
    <div className={styles.container}>
      <Slidebar />
      <div className={styles.right}>
        <div
          style={{
            backgroundImage: `url("https://itimgstorage.blob.core.windows.net/source/img.jpg")`,
          }}
          className={styles.Bannerpic}></div>

        {resInfo.length > 0 && (
          <div className={styles.logoBanner}>
            <img
              src="/assets/img/logo.png"
              alt="Logo"
              className={styles.logo}
            />
            <div className={styles.details}>
              <h1 className={styles.menuname}>{resInfo[0].name}</h1>
              <p className={styles.txt}>{resInfo[0].cate}</p>
              <p className={styles.txt}>{resInfo[0].txt}</p>

            </div>
            {resInfo[0].waitingPossible 
            ?  <div className={styles.bookbtn} onClick={handleBooking}>
            대기하기
          </div>
          :  <div className={styles.bookready} >
          대기 준비중
        </div> }
           
          </div>
        )}

        {resInfo.length > 0 && (
          <div className={styles.infolayout}>
            <p className={styles.infoLogo}>영업 정보</p>
            <p className={styles.info}>주소: {resInfo[0].address}</p>
            <p className={styles.info}>영업 시간: {resInfo[0].time}</p>
            <p className={styles.info}>전화번호: {resInfo[0].phone}</p>
            <p className={styles.infoLogo}>편의시설</p>
            <p className={styles.info}>{resInfo[0].storeFacilities.join(', ')}</p>


          </div>
        )}
      </div>
    </div>
  );
}

export default Detail;
