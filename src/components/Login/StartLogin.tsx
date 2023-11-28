//StartLogin.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
import styles from "../Login/StartLogin.module.scss";
import { useHistory } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  emailState,
  loginState,
  userIdState,
  userNameState,
} from "../../recoil/atom";

function StartLogin() {
  const [token, setToken] = useState("");
  const CLIENT_ID = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
  const params = new URL(document.location.toString()).searchParams;
  const code = params.get("code");

  const userIdAtom = useSetRecoilState(userIdState);
  const storeIdAtom = useSetRecoilState(userNameState);
  const emailAtom = useSetRecoilState(emailState);
  const isLoggedState = useSetRecoilState(loginState);
  const KakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  };
  const history = useHistory();
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
          getUserCheck(res.data.userId);
          // API로 부터 받은 데이터 출력
          userIdAtom(res.data.userId);
          storeIdAtom(res.data.userName);
          emailAtom(res.data.email);
          //회원정보가 있는지 확인하는 로직
        })
        .catch((error) => {
          window.location.href = "http://localhost:3000/user/companyset";
          alert("실패");
          console.log(error);
        });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("토큰 에러: " + error.message);
      } else {
        console.log("토큰에러");
      }
    }
  };

  //회원정보가 있는지 확인하는 로직
  const getUserCheck = async (userId: number) => {
    try {
      const res = await axios.get(`http://localhost:9000/user/${userId}`);
      if (res.data.businessCardImg !== null) {
        console.log(res.data);
        history.push("/user/main");
      } else {
        isLoggedState(true);
        history.push("/user/companyset");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //식당 정보
  const restauratClick = () => {
    window.location.href = "http://localhost:3001/";
  };

  useEffect(() => {
    if (code) getToken();
  }, [code]);

  const isLogged = useRecoilValue(loginState);

  useEffect(() => {
    isLogged && history.push("/user/main");
  });

  return (
    <div className={styles.container}>
      <div className={styles.left}></div>
      <div className={styles.right}>
        <img
          className={styles.logoimg}
          alt="logo"
          src="https://itimgstorage.blob.core.windows.net/source/mainLogo.png"
        />
        <h2 className={styles.righttitle}>시간을 먹다</h2>
        <h2 className={styles.eattitle}>잇츠타임</h2>
        <button className={styles.kakaologinbtn} onClick={KakaoLogin}>
          카카오로 빠르게 시작하기
        </button>
        <h1 className={styles.admin} onClick={restauratClick}>
          잇츠타임 어드민으로 로그인하기{" "}
        </h1>
      </div>
    </div>
  );
}

export default StartLogin;
