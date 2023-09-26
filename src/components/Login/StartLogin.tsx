//StartLogin.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
import styles from "../Login/StartLogin.module.scss";
import {useHistory} from 'react-router-dom';

function StartLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");
  const CLIENT_ID = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
  const params = new URL(document.location.toString()).searchParams;
  const code = params.get("code");


  const KakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  };
  const history = useHistory()
  const getToken = async () => {
    const payload = qs.stringify({
      grant_type: "authorization_code",
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      code: code,
      client_secret: CLIENT_SECRET,
      "Content-Type": "application/x-www-form-urlencoded ",
    });

    try {
      const res = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        payload,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setToken(res.data.access_token);
      postToken(res.data.access_token);
    } catch (error) {
      console.log("토큰에러 " + error);
    }
  };

  //----------------------토큰통신-------------------------------------------
  const postToken = async (data: String) => {
    const postToken = {
      token: data,
    };
    console.log(postToken.token);
    try {
      axios({
        method: "POST",
        url: "http://localhost:9000/oauth/kakao",
        data: data,
        // header에서 JSON 타입의 데이터라는 것을 명시
      })
        .then((res) => {
          alert("성공");
          // API로 부터 받은 데이터 출력
          console.log(res.data);
        })
        .catch((error) => {
          console.log("실패");
          console.log(error);
        });

      // const response = await axios.post(
      //   `http://localhost:9000/oauth/kakao`,
      //   postToken
      // );
      // console.log("토큰 post 성공: ", response);
      setIsLoggedIn(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("토큰 에러: " + error.message);
      } else {
        console.log("토큰에러, 알 수 없는 오류");
      }
    }
  };

  if (isLoggedIn) {
    //./MainPage.tsx로 이동
    history.push('/user/main')
  };

  const restauratClick = () => {
    history.push('/restaurantJoin')
  }
  const getKakaoUser = async () => {
    try {
      const kakaoUser = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserName(kakaoUser.data.properties.nickname);
    } catch (error) {
      console.log("사용자 정보 에러: " + error);
    }
  };

  useEffect(() => {
    if (code) getToken();
  }, [code]);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
      </div>
      <div className={styles.right}>
      <img className={styles.logoimg}alt="logo" src="https://itimgstorage.blob.core.windows.net/source/mainLogo.png" />
        <h2 className={styles.righttitle}>시간을 먹다</h2>
        <h2 className={styles.eattitle}>잇츠타임</h2>
        <button className={styles.kakaologinbtn} onClick={KakaoLogin}>
          카카오로 빠르게 시작하기
        </button>
        <button className={styles.kakaologinbtn} onClick={restauratClick}>
          잇츠타임 입점하기
        </button>
      </div>
    </div>
  );
}

export default StartLogin;
