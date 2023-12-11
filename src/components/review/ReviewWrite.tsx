import React, { useState } from "react";
import styles from "./ReviewWrite.module.scss";
import { useHistory } from "react-router";

const ReviewWrite = () => {
  const [rating, setRating] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const options = ["분위기가 좋아요", "맛있어요", "편안해요", "위생적이에요"];
  const history = useHistory();
  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleOptionChange = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = () => {
    if (window.confirm("리뷰를 작성하시겠습니까?")) {
      history.push("/review/ok");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.review}>
        <h1>방문하신 짬뽕 잘하시는 집은 어떠셨어요?</h1>
        <div className={styles.stars}>
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;

            return (
              <label key={i}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => handleRating(ratingValue)}
                />
                <i className={ratingValue <= rating ? styles.orange : ""}>★</i>
              </label>
            );
          })}
        </div>
        <div className={styles.options}>
          {options.map((option, i) => (
            <label key={i}>
              <input
                type="checkbox"
                name={option}
                checked={selectedOptions.includes(option)}
                onChange={() => handleOptionChange(option)}
              />
              {option}
            </label>
          ))}
        </div>
        <textarea
          className={styles.textarea}
          placeholder="리뷰를 작성해주세요."
        />
        <button onClick={handleSubmit}>제출하기</button>
      </div>
    </div>
  );
};

export default ReviewWrite;
