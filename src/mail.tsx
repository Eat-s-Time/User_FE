import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';


function sendEmail(mail: string, recordResult: any[]) {
    try {
      const message = "굳굳"
  
      const templateParams = {
        to_email: mail,
        from_name: "benary",
        message: message,
      };
  
      emailjs
        .send(
          "Eat_Time", // 서비스 ID
          "benary", // 템플릿 ID
          templateParams,
          "0-0VI020CMJ10b6EE" // public-key
        )
        .then((response: any) => {
          console.log("이메일이 성공적으로 보내졌습니다:", response);
        })
        .catch((error: any) => {
          console.error("이메일 보내기 실패:", error);
        });
    } catch (error) {
      console.error("이메일 보내기 실패:", error);
    }
  }
  
  export default  sendEmail;
  