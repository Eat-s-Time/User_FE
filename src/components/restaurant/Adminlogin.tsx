import { useState } from "react";
import { useHistory } from "react-router";
import styles from "./Adminlogin.module.scss";

function Adminlogin() {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  const history = useHistory();

  const handleLogin = () => {
    if (userID === "admin" && password === "admin") {
      setLogin(true);
      history.push("/admin");
    } else {
      console.log("로그인 실패");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>시간을 먹다</h2>
      <h2 className={styles.eattitle}>Eat's Time</h2>
      <h1 className={styles.joinmessage}>
        잇츠타임 사장님들을 위한 전용 어드민 페이지입니다. <p></p>
        입점 문의는 하단 [잇츠타임 입점상회]를 이용해주세요.  
      </h1>
      <div className={styles.logincontainer}>
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
      </div>
      <button className={styles.loginbtn} onClick={handleLogin}>
        로그인하기
      </button>
      <h1 className={styles.admin}>잇츠타임 입점상회</h1>

      <h1 className={styles.joinmessage}>© 2023. Eat'sTime Corp., Inc. All rights reserved</h1>
    </div>
  );
}

export default Adminlogin;
