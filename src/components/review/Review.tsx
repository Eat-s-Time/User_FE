import { useHistory } from "react-router";
import Slidebar from "../user/Sidebar";
import styles from "./Review.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { RiDoubleQuotesL } from "react-icons/ri";

interface review {
  userName: string;
  reviewDate: string;
  reviewRating: number;
  reviewImg: string;
  reviewContent: string;
}
function Review() {
  const history = useHistory();
  const [data, setData] = useState<review[]>([]);

  const getReviewList = async () => {
    try {
      const res = await axios.get<review[]>(
        "http://localhost:9000/owner/select/stores"
      );
      console.log("메뉴", res);
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
  const reviewResponse = [
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
    {
      userName: "한미영",
      reviewDate: "2023-11-27",
      reviewRating: 5,
      reviewContent: "재료가 신선해서 음식이 더욱 맛있었어요.",
    },
    {
      userName: "유승민",
      reviewDate: "2023-11-27",
      reviewRating: 4,
      reviewContent: "다양한 메뉴가 있어 선택의 폭이 넓었습니다.",
    },
    {
      userName: "손지훈",
      reviewDate: "2023-11-27",
      reviewRating: 3,
      reviewContent: "친절한 직원 덕분에 즐거운 시간을 보냈습니다.",
    },
    {
      userName: "김혜진",
      reviewDate: "2023-11-27",
      reviewRating: 2,
      reviewContent: "음식 맛이 평범했지만 분위기는 좋았습니다.",
    },
    {
      userName: "이동욱",
      reviewDate: "2023-11-27",
      reviewRating: 1,
      reviewContent: "기대 이하였고, 서비스도 만족스럽지 못했습니다.",
    },
    {
      userName: "장서연",
      reviewDate: "2023-11-27",
      reviewRating: 5,
      reviewContent: "매우 만족스러웠고 다시 방문하고 싶습니다.",
    },
    {
      userName: "고민지",
      reviewDate: "2023-11-27",
      reviewRating: 4,
      reviewContent: "디저트가 정말 맛있었습니다.",
    },
    {
      userName: "김준호",
      reviewDate: "2023-11-27",
      reviewRating: 3,
      reviewContent: "음식이 빨리 나와서 좋았습니다.",
    },
    {
      userName: "윤서아",
      reviewDate: "2023-11-27",
      reviewRating: 2,
      reviewContent: "음식이 너무 늦게 나와서 기다림이 길었습니다.",
    },
    {
      userName: "박하늘",
      reviewDate: "2023-11-27",
      reviewRating: 1,
      reviewContent: "가격 대비 음식 퀄리티가 낮았습니다.",
    },
    {
      userName: "정유진",
      reviewDate: "2023-11-27",
      reviewRating: 5,
      reviewContent: "직원들이 매우 친절했습니다.",
    },
    {
      userName: "한지민",
      reviewDate: "2023-11-27",
      reviewRating: 4,
      reviewContent: "음식 맛과 분위기 모두 만족스러웠습니다.",
    },
    {
      userName: "유재석",
      reviewDate: "2023-11-27",
      reviewRating: 3,
      reviewContent: "가격이 조금 비싸지만 맛은 좋았습니다.",
    },
    {
      userName: "이광수",
      reviewDate: "2023-11-27",
      reviewRating: 2,
      reviewContent: "음식이 너무 기름져서 아쉬웠습니다.",
    },
    {
      userName: "강호동",
      reviewDate: "2023-11-27",
      reviewRating: 1,
      reviewContent: "서비스가 매우 불친절했습니다.",
    },
  ];

  const averageRating =
    reviewResponse.reduce((sum, review) => sum + review.reviewRating, 0) /
    reviewResponse.length;
  //reviewResponse는 추후 data로 변경할 것.

  useEffect(() => {
    return history.listen((location) => {
      if (history.action === "POP") {
        history.push("/user/main");
      }
    });
  }, [history]);

  return (
    <div className={styles.container}>
      <Slidebar />
      <div className={styles.right}>
        <div>
          <h1 className={styles.averageRating}>평점</h1>
          {[...Array(averageRating)].map((_, i) => (
            <FaStar className={styles.ratingStar} key={i} />
          ))}
        </div>
        <div className={styles.ratingLength}>
          <h1 className={styles.reviewtitle}>리뷰 {reviewResponse.length}건</h1>
        </div>
        {reviewResponse.map((item, index) => (
          <div key={index} className={styles.reviewContainer}>
            <RiDoubleQuotesL className={styles.queotsize} />
            <div className={styles.reviewitem}>
              <h1 className={styles.reviewname}>{item.userName}</h1>
              {[...Array(item.reviewRating)].map((_, i) => (
                <FaStar className={styles.ratingStar} key={i} />
              ))}
            </div>
            <h1 className={styles.reviewinfo}>{item.reviewDate}</h1>
            <p className={styles.reviewContent}>{item.reviewContent}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Review;
