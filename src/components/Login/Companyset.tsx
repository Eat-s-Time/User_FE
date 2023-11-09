import { useState } from "react";
import styles from "./Companyset.module.scss";

function Companyset() {
  interface UserData {
    username: string;
    email: string;
  }

  const [file, setFile] = useState<File | null>(null);
  const [userData, setUserData] = useState<UserData>({ username: '', email: '' });



  //---------------------------------이미지 업로드---------------------------------
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };


 const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      alert('이미지를 선택해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('username', userData.username);
    formData.append('email', userData.email);

    try {
      const response = await fetch('localhost:9000', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('데이터가 서버로 전송되었습니다.');
        // 응답 처리
      } else {
        console.error('서버 에러:', response);
      }
    } catch (error) {
      console.error('전송 중 에러 발생:', error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h1 className={styles.title}>회사 인증하기 안내</h1>
        <div className={styles.textContainer}>
          <h1>
            회사 인증 안내 명함, 메일 도용 등 올바르지 않은 경로를 통해 인증을
            시도할 경우, 관련 법에 따라 법적 책임이 따를 수 있습니다. 아래 방법
            중 하나를 선택하여 인증할 수 있습니다. 캡쳐 화면을 이용한 인증은
            포토샵으로 위조가 가능하기 때문에 인증 수단으로 사용하지 않습니다. 
            회사 인증까지 최대 5일까지 발생할 수 있습니다. 
          </h1>
        </div>
        <div className={styles.btnContainer}>
             <input
        type="file"
        id="imageInput"
        accept="image/*" // 이미지 파일만 선택
        style={{ display: 'none' }} // 파일 입력 숨기기
        onChange={handleImageUpload}
      />
          <button className={styles.btn} onClick={() => document.getElementById('imageInput')?.click()}> 명함 인증하기 </button>
          <button className={styles.btn}> 회사 메일 인증하기</button>
        </div>
      </div>
    </div>
  );
}

export default Companyset;
