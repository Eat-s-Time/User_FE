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
        userName: "김지아",
        reviewDate: "2023-11-27",
        reviewRating: 5,
        reviewContent: "음식이 매우 맛있고 서비스도 좋았습니다.",
      },
      {
        userName: "박준혁",
        reviewDate: "2023-11-27",
        reviewRating: 4,
        reviewContent: "분위기가 아늑하고 음식 맛이 훌륭해요.",
      },
      {
        userName: "이하나",
        reviewDate: "2023-11-27",
        reviewRating: 3,
        reviewContent: "가격 대비 만족스러운 식사였습니다.",
      },
      {
        userName: "최윤정",
        reviewDate: "2023-11-27",
        reviewRating: 2,
        reviewContent: "서비스가 느리고 개선이 필요합니다.",
      },
      {
        userName: "정태원",
        reviewDate: "2023-11-27",
        reviewRating: 1,
        reviewContent: "음식이 너무 짜서 불편했습니다.",
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
        <div className={styles.right}>
          <h1 className={styles.reviewtitle}>웨이팅 내역</h1>
          {historyResponse.map((item, index) => (
            <div className={styles.reviewContainer}>
              <div key={index} className={styles.reviewitem}>
                <h1 className={styles.reviewname}>{item.reviewRating}</h1>
                <h1 className={styles.reviewname}>{item.userName}</h1>
                <h1 className={styles.reviewinfo}>{item.reviewDate}</h1>
                <p className={styles.reviewinfo}>{item.reviewContent}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default History;
  