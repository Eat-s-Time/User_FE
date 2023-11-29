import { useHistory } from "react-router";
import styles from "./EditProfile.module.scss";
import { useRecoilState, useRecoilValue } from "recoil";
import { emailState, userIdState } from "../../../recoil/atom";
import axios from "axios";
import { useEffect, useState } from "react";

function EditProfile() {
  const history = useHistory();
  const userId = useRecoilValue(userIdState);
  const [nickName, setNickname] = useState("");
  const [email, setEmail] = useRecoilState(emailState);
  const [user, setUser] = useState({});
  //회사 및 주소 가져오기
  const getUserInfo = async (userId: string) => {
    try {
        const res = await axios.get(`http://localhost:9000/user/${userId}`);
        setUser(res.data); // 사용자 정보 전체를 상태에 저장
        setNickname(res.data.nickname); //닉네임
        setEmail(res.data.email); // 이메일
        
    } catch (error) {
      console.log(error);
    }
  };

  //onChange 함수
  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  //마이페이지 백엔드 통신 로직
  const putUserInfo = async () => {
    if (window.confirm("정보를 수정하시겠습니까?")) {
      try {
        const updatedUser = {
          ...user,
          nickname: nickName,
          email: email,
        };
        const res = await axios.put(`http://localhost:9000/user/${userId}/upload`, updatedUser);
       alert("사용자 정보가 수정되었습니다.");
      } catch (error) {
        console.error("사용자 정보 업데이트에 실패했습니다.", error);
      }
    }
  };


  useEffect(() => {
    getUserInfo(userId);
  }, []); //마운트 될 때만 실행

  return (
    <div className={styles.container}>
      <img
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        className={styles.profile}></img>
      <div className={styles.waitingContainer}>
        <div className={styles.waitingLine}>
          <h1>닉네임</h1>
          <input value={nickName} onChange={handleNicknameChange} />
        </div>
        <div className={styles.waitingLine}>
          <h1>이메일</h1>
          <input value={email} onChange={handleEmailChange} />
         
        </div>
        <h1 className={styles.saveBtn} onClick={putUserInfo}>
            저장하기
          </h1>
      </div>
      <h1
        className={styles.line}
        onClick={() => history.push("/user/editcompany")}>
        회사 변경하기
      </h1>
    </div>
  );
}

export default EditProfile;
