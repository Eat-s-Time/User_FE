import { useHistory} from "react-router";
import styles from "./Mypage.module.scss";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { adultCountState, childCountState, loginState, storeState, userIdState } from "../../../recoil/atom";
import axios from "axios";
import { useEffect, useState } from "react";
import SearchHeader from "../../../SearchHeader";



interface WaitingInfo {
  time: string;
  number: string;
  name: string;
  store: string;
}
function Mypage() {
  const history = useHistory();
  const setLoginAtom = useSetRecoilState(loginState);
  const adultCount = useRecoilValue(adultCountState);
  const childCount = useRecoilValue(childCountState);
  const store = useRecoilValue(storeState);

  const [nickName, setNickname] = useState("");
  // 백엔드 웨이팅 정보 받아오기 (임시)
  // const getwaitingInfo = () => {
  // axios.get("http://localhost:9000/waiting/{id}").then((res) => {
  //   res.data;
  // });
  // return resInfo}

  //useEffect(() => {

  //getwaitingInfo
  // }, []);
  const userId = useRecoilValue(userIdState);
  const waitingInfoList: WaitingInfo[] = [
    {
      time: "11:30",
      number: `성인 ${adultCount} 유아 ${childCount}`,
      name: nickName,
      store: store,
    },
  ];

    //회사 및 주소 가져오기
    const getUserInfo = async (userId: string) => {
      try {
        const res = await axios.get(`http://localhost:9000/user/${userId}`);
        setNickname(res.data.nickname); //닉네임 
      } catch (error) {
        console.log(error);
      }
    };


  const onClick = (type: string) => {
    type === "history"
      ? history.push("/user/history")
      : history.push("/user/editprofile");
  };

  const onLoggout = () => {
    if(window.confirm("로그아웃 하시겠습니까?")){
      setLoginAtom(false);
      history.push("/");
    }
  }


  useEffect(() => {
    getUserInfo(userId);
  })
  return (
    <div className={styles.container}>
      <SearchHeader />
      <img
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        className={styles.profile}></img>
      <h1 className={styles.name}>{nickName}</h1>
      <div className={styles.waitingContainer}>
        <p className={styles.Scheduled}>이용 예정</p>
        <h1 className={styles.waitingStore}>{waitingInfoList[0].store}</h1>
        <div className={styles.waitingLine}>
          <h1>남은 웨이팅 시간</h1> <h1>15분</h1>
        </div>
        <div className={styles.waitingLine}>
          <h1>인원</h1>
          <h1>{waitingInfoList[0].number}</h1>
        </div>
      </div>
      <h1 className={styles.line} onClick={() => onClick("history")}>
        이용내역
      </h1>
      <h1 className={styles.line} onClick={() => onClick("edit")}>
        내 정보 수정
      </h1>
      <h1 className={styles.line} onClick={() => onLoggout()}>
        로그아웃
      </h1>
    </div>
  );
}

export default Mypage;
