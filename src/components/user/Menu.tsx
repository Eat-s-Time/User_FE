import { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
import styles from "./Menu.module.scss";
import { useHistory } from "react-router-dom";
import Slidebar from "./Slidebar";
import { useRecoilValue } from "recoil";
import { storeIdState } from "../../recoil/atom";

function Menu() {
  const menuinfo = [
    {
      menu: "김치 라면",
      price: 3000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "얼큰한 맛의 김치국물이 끝내주는 라면",
    },
    {
      menu: "열라면",
      price: 4000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "얼큰한 맛 때문에 열이 나요",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },

    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
    {
      menu: "감자라면",
      price: 2000,
      img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
      txt: "너 감자는 먹어봤니?",
    },
  ];
  const storeId = useRecoilValue(storeIdState);



const getMenuItems = () => {
  try {
    const response = axios.post(`http://localhost:9000/owner/stores/${storeId}/menus`)
  console.log(response);
  } catch (error) {
    console.log("에러가 빨간색이고 뜨겁누 ㅋㅋ");
    console.log( error);
    
  }
};

useEffect(() => {
  getMenuItems();
});


  const menuItems = menuinfo.map((item, index) => (
    <div key={index} className={styles.menuitem}>
      <img className={styles.menunimg} src={item.img} alt={item.menu} />
      <h1 className={styles.menuname}>{item.menu}</h1>
      <h1 className={styles.menuinfo}>{item.price}원</h1>
      <p className={styles.menuinfo}>{item.txt}</p>
    </div>
  ));

  return (
    <div className={styles.container}>
      <Slidebar />
      <div className={styles.right}>
        <div className={styles.menulayout}> {menuItems}</div>
      </div>
    </div>
  );
}
export default Menu;
