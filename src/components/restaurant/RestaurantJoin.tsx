import styles from "./RestaurantJoin.module.scss";

function RestaurantJoin() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>잇츠타임 입점신청</h1>

      <label>사업자등록증</label>
      <input type="file" />

      <label>영업신고증</label>
      <input type="file" />

      <label>통장사본</label>
      <input type="file" />

      <label>가게 전화번호</label>
      <input type="text" />

      <label>로고</label>
      <input type="file" />

      <label>원산지</label>
      <input type="text" />

      <label>메뉴 및 가격</label>
      <input type="text" />

      <label>영업시간</label>
      <input type="text" />

      <label>휴무일</label>
      <input type="text" />

      <button> 입점 신청하기</button>
    </div>
  );
}

export default RestaurantJoin;
