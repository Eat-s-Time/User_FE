import axios from "axios";
import React, { useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Adminlogin.module.scss";

interface LoginResponse {
  success: boolean;
}

function Adminlogin() {
  const [userID, setUserID] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const history = useHistory();


  const goBusinessMeet = () => {
    history.push("/restaurantJoin");
  }

  const login = async () => {
    try { //백엔드통신 부분
      const response = await axios.post<LoginResponse>("http://localhost:9000/api/login", {
        username: userID,
        password: password,
      });

      if (response.data.success) {
        history.push("/adminstart");
      } else {
        setError("아이디 또는 비밀번호를 확인해주세요.");
      }
    } catch (error) {
      console.error("로그인 요청 중 에러 발생", error);
      setError("로그인 요청 중 에러 발생");
    }
  };

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();
    login();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>시간을 먹다</h2>
      <h2 className={styles.eattitle}>Eat's Time</h2>
      <h1 className={styles.joinmessage}>
        잇츠타임 사장님들을 위한 전용 어드민 페이지입니다. <p></p>
        입점 문의는 하단 [잇츠타임 입점상회]를 이용해주세요.
      </h1>
      <form className={styles.logincontainer} onSubmit={handleLogin}>
        <label>ID</label>
        <input 
          type="text" 
          value={userID} 
          onChange={(e) => setUserID(e.target.value)}
          placeholder="아이디"
        />
        <label>Password</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
      {error && <div className={styles.errorMessage}>{error}</div>}

        <button type="submit" className={styles.loginbtn}>
          로그인하기
        </button>
      </form>
      <h1  onClick={ goBusinessMeet} className={styles.admin}>잇츠타임 입점상회</h1>
      <h1 className={styles.joinmessage}>© 2023. Eat'sTime Corp., Inc. All rights reserved</h1>
    </div>
  );
}

  export default Adminlogin;