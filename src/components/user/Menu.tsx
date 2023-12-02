import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Menu.module.scss";
import { useHistory } from "react-router-dom";
import Slidebar from "./Sidebar";


interface menuResponse {
  menuName: string;
  menuPrice: number;
  menuInfo: string;
}

interface menuInfo {
  name: string;
  img: string;
  txt: string;
  price: number;
}

function Menu() {
  const [menuInfo, setMenuInfo] = useState<menuInfo[]>([]); // 이 부분은 useState를 사용해도 됩니다.
  const history = useHistory();
  const path = window.location.pathname; // URL의 경로 부분을 가져옴
  const segments = path.split("/"); // '/'를 기준으로 분할
  const storeId = Number(segments.pop()); // 맨 마지막 요소를 제거하고 반환


  useEffect(() => {
    const getMenuItems = async () => {
      try {
        const response = await axios.get<menuResponse[]>(
          `http://localhost:9000/owner/stores/${storeId}/menus`
        );
        console.log("메뉴", response.data);
        const newMenuInfo = response.data.map((item) => ({
          price: item.menuPrice,
          txt: item.menuInfo,
          name: item.menuName,
          img: "https://itimgstorage.blob.core.windows.net/source/img.jpg",
        }));
        setMenuInfo(newMenuInfo);
      } catch (error) {
        console.log(error);
      }
    };
    getMenuItems();
  }, [storeId]);

  const menuItems = menuInfo.map((item, index) => (
    <div key={index} className={styles.menuitem}>
      <img className={styles.menunimg} src={item.img} alt={item.name} />
      <h1 className={styles.menuname}>{item.name}</h1>
      <h1 className={styles.menuinfo}>{item.price}원</h1>
      <p className={styles.menuinfo}>{item.txt}</p>
    </div>
  ));
  //뒤로가기 메인페이지로
  useEffect(() => {
    return history.listen((location) => {
      if (history.action === "POP") {
        history.push("/user/main");
      }
    });
  }, [history]);

  
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
