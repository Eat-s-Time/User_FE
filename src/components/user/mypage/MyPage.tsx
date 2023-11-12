import { useHistory, useLocation } from "react-router";
import styles from "./Mypage.module.scss";
interface WaitingInfo {
  time: string;
  number: string;
  name: string;
  store: string;
}
function Mypage() {
  const history = useHistory();

  // 백엔드 웨이팅 정보 받아오기 (임시)
  // const getwaitingInfo = () => {
  // axios.get("http://localhost:9000/waiting/{id}").then((res) => {
  //   res.data;
  // });
  // return resInfo}

  //useEffect(() => {

  //getwaitingInfo
  // }, []);

  const waitingInfoList: WaitingInfo[] = [
    {
      time: "11:30",
      number: "성인 2 유아 0",
      name: "양하연",
      store: "후야",
    },
  ];

  const onClick = () => {
    history.push("/user/editprofile");
  };
  return (
    <div className={styles.container}>
      <img
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        className={styles.profile}></img>
      <h1 className={styles.name}>양하연</h1>
      <div className={styles.waitingContainer}>
        <p className={styles.Scheduled}>이용 예정</p>
        <h1 className={styles.waitingStore}>{waitingInfoList[0].store}</h1>
        <div className={styles.waitingLine}>
          {" "}
          <h1>이용 예정시간</h1> <h1>{waitingInfoList[0].time}</h1>
        </div>
        <div className={styles.waitingLine}>
          {" "}
          <h1>인원</h1>
          <h1>{waitingInfoList[0].number}</h1>
        </div>
      </div>
      <h1 className={styles.line}>이용내역</h1>
      <h1 className={styles.line} onClick={onClick}>내 정보 수정</h1>
    </div>
  );
}

export default Mypage;
