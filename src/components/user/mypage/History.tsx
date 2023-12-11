import { useEffect, useState } from "react";
import styles from "./History.module.scss";
import { useHistory } from "react-router";
import axios from "axios";

interface review {
  userName: string;
  reviewDate: string;
  reviewRating: number;
  reviewImg: string;
  reviewContent: string;
}
function History() {
  const history = useHistory();
  const [data, setData] = useState<review[]>([]);

  const getReviewList = async () => {
    try {
      const res = await axios.get<review[]>(
        "http://localhost:9000/user/{userId}/stores"
      );
      console.log("예약내역", res);
      const reviewResponse = res.data.map((res) => ({
        userName: res.userName,
        reviewDate: res.reviewDate,
        reviewRating: res.reviewRating,
        reviewImg:
          "https://itimgstorage.blob.core.windows.net/source/bgposter.png",
        reviewContent: res.reviewContent,
      }));
      setData(reviewResponse);
    } catch (error) {
      console.log(error);
    }
  };
  //임시데이터
  const historyResponse = [
    {
      storeName: "짬뽕 참 잘하는 집",
      waitingTime: "2023-12-05 13:56",
      numPeople: "성인 5명 아동 0명",
    },
    {
      storeName: "김가네 김치찌개",
      waitingTime: "2023-11-27 13:56",
      numPeople: "성인 1명 아동 2명",
    },
    {
      storeName: "이탈리아나 피자",
      waitingTime: "2023-11-25 17:30",
      numPeople: "성인 2명 아동 1명",
    },
    {
      storeName: "중국집 볶음밥",
      waitingTime: "2023-11-26 12:20",
      numPeople: "성인 3명",
    },
    {
      storeName: "베이커리 카페",
      waitingTime: "2023-11-27 15:15",
      numPeople: "성인 1명",
    },
    {
      storeName: "한우갈비 전문점",
      waitingTime: "2023-11-22 18:45",
      numPeople: "성인 4명",
    },
    {
      storeName: "해물탕 파티",
      waitingTime: "2023-11-24 13:00",
      numPeople: "성인 2명 아동 3명",
    },
    {
      storeName: "돈까스 맛집",
      waitingTime: "2023-11-23 14:10",
      numPeople: "성인 1명 아동 1명",
    },
    {
      storeName: "베트남 쌀국수",
      waitingTime: "2023-11-30 12:30",
      numPeople: "성인 3명",
    },
    {
      storeName: "초밥 천국",
      waitingTime: "2023-11-29 19:00",
      numPeople: "성인 2명",
    },
    {
      storeName: "매콤 닭발",
      waitingTime: "2023-11-28 20:30",
      numPeople: "성인 2명 아동 2명",
    },
  ];

  useEffect(() => {
    return history.listen((location) => {
      if (history.action === "POP") {
        history.push("/user/mypage");
      }
    });
  }, [history]);

  return (
    <div className={styles.container}>
      <h1 className={styles.historytitle}>웨이팅 내역</h1>
      <div className={styles.listContainer}>
        {historyResponse.map((item) => (
          <div className={styles.historyContainer}>
            <div className={styles.historyTxt}>
              <div className={styles.horizonLine}>
                <h1 className={styles.storeName}>{item.storeName}</h1>
                <div  className={styles.reviewBtn}>이용 완료</div>
              </div>
              <div className={styles.horizonLine}>
                <h1>예약 시각</h1>
                <h1>{item.waitingTime}</h1>
              </div>
              <div className={styles.horizonLine}>
                <h1>인원</h1>
                <h1 className={styles.numPeople}>{item.numPeople}</h1>
              </div>
              <div className={styles.horizonLine}>
                <div  className={styles.reviewBtn} onClick={() => history.push(`/user/detail/14`)}>매장 상세보기 </div>
                <div  className={styles.reviewBtn} onClick={() => history.push(`/user/reviewrite`)}>리뷰 작성하기 </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
