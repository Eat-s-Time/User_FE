import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import SearchHeader from "../../SearchHeader";

const Wrapper = styled.div`
  background-color: black;
  height: 2000px;
`;

const Banner = styled.div<{ bgposter: string }>`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center; //상 *중* 하
  padding: 60px;
  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 1),
      rgba(0, 0, 0, 0)
    ),
    url(${(props) => props.bgposter});
  background-size: cover;
`;

const SliderTitle = styled.h2`
  padding-left: 40px;
  padding-bottom: 20px;
  font-size: 30px;
  font-weight: bold;
  color: white;
`;
const Title = styled.h2`
  font-size: 68px;
  color: white;
  margin-bottom: 50px;
`;

const OverView = styled.p`
  color: white;
  font-size: 25px;
  width: 50%; //없으면 끝까지 줄줄줄
  line-height: 1.5em; //폰트 크기의 1.5
`;
//슬라이더
const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const SliderRow = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
  align-items: center;
`;

const SliderLeft = styled(motion.div)`
  position: absolute;
  width: 50px;
  height: 400px;
  color: yellow;
  opacity: 0.3;
  cursor: pointer;
  z-index: 2;
  svg {
    transition: transform 0.15s;
  }
  &:hover {
    background-color: white;
    opacity: 0.8;
    svg {
      transform: scale(1.5);
    }
  }
`;

const SliderRight = styled(motion.div)`
  position: absolute;
  /* bottom: 0; */
  right: 0;
  display: flex;
  align-items: center;
  width: 50px;
  height: 400px;
  color: yellow;
  opacity: 0.3;
  cursor: pointer;
  svg {
    transition: transform 0.15s;
  }
  &:hover {
    background-color: white;
    opacity: 0.8;
    svg {
      transform: scale(1.5);
    }
  }
`;
const RightSvg = styled(motion.svg)`
  margin-left: 50px;
  margin-right: 50px;
  width: 95px;
  height: 25px;
  fill: yellow;
  path {
    stroke-width: 6px;
  }
`;

const Item = styled(motion.div)<{ bgposter?: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgposter || "https://itimgstorage.blob.core.windows.net/source/bgposter.png"});
  background-size: cover;
  background-position: center center;
  height: 400px;
  cursor: pointer;
  color: white;
  font-size: 40px;
  //양 쪽 끝 포스터 잘림 방지
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  width: 100%;
  bottom: 0;
  height: 80px;
  background-color: black;
  opacity: 0;
  position: absolute;
  h4 {
    font-size: 13px;
    text-align: left;
    margin-left: 10px;
    padding-bottom: 3px;
  }
  h3 {
    font-size: 18px;
    text-align: left;
    margin-left: 10px;
    font-weight: bold;
  }

  display: inline;
`;

const rowVariants = {
  //슬라이드 애니메이션
  hidden: { x: window.outerWidth + 5 },
  visible: { x: 0 },
  exit: { x: -window.outerWidth - 5 },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: { type: "transition", duration: 0.3, delay: 0.3 },
  },
};

interface Restaurant {
  storeId: number;
  storeName: string;
  storeType: string;
  storeImg: string;
}

function Homelist() {
  const history = useHistory(); //여러 route 사이를 이동
  const [data, setData] = useState<Restaurant[]>([]); // state로 관리
  const [page, setPage] = useState(0);
  // const onClcikSlid = () => setPage((prev) => prev + 1);
  //빠르게 클릭했을 때 행이 exit하는 도중 다음 row가 사라져 gap이 넓어지는 오류 방지
  const [slideNext, setSlideNext] = useState(false);
  //슬라이드 onClick함수: 클릭스 인덱스가 +1
  const onClcikSlid = () => {
    if (slideNext) return;
    toggleSlideNext(); //slideNext false로000
    const maxIndx = Math.floor(data.length / 6); // [총 수/슬라이더 갯수] 내림차순 page는 0에서 시작하므로,
    setSlideNext(true);
    setPage((prev) => (prev === maxIndx ? 0 : prev + 1)); //증가하고자 하는 인덱스가 max면, 0으로 되돌림 , 아니라면 인덱스에 +1
  };
  const toggleSlideNext = () => setSlideNext((prev) => !prev);

  const onClikLeft = () => {
    setPage((prev) => prev - 1);
  };


  const getRestaurantList = async () => {
    try {
      const res = await axios.get("http://localhost:9000/owner/select/stores");
      const storeResponse = res.data.map((restaurant: Restaurant) => ({
        storeId: restaurant.storeId,
        storeName: restaurant.storeName,
        storeType: restaurant.storeType,
        storeImg: "https://itimgstorage.blob.core.windows.net/source/bgposter.png",
      }));
      setData(storeResponse);
    } catch (error) {
      console.log(error);
    }
  };
const onClickDetail = (id: number) => {
  history.push(`/user/detail/${id}`);
};

  useEffect(() => {
    getRestaurantList();
  });

  return (
    <Wrapper>
      <SearchHeader/>
      <Banner
        bgposter="https://itimgstorage.blob.core.windows.net/source/bgposter.png">
        <Title>용용선생</Title>
        <OverView>
          용용선생은 1930년대 홍콩만이 가진 독특한 분위기를 연출하였습니다.
          영국의 지배를 받던 시기의 홍콩은 서양의 문화와 결합되어 새로운 분위를
          자아냈고, 영국 신사들이 격식 없이 캐주얼하게 즐겼던 홍콩 뒷골목의
          주점들을 모티브로 삼았습니다. 용용선생으로 걸어 들어올 때, 현실에서
          벗어나 어딘가 새로운 공간으로 옮겨진 것 같은 기분을 느끼실 수
          있습니다. 그 공간 속에서 재미있는 메뉴들과 바이주를 캐주얼하게
          즐겨보세요.
        </OverView>
      </Banner>
      <Slider id="Best">
        <SliderTitle>가산 디지털단지 근처 식당</SliderTitle>


        <AnimatePresence initial={false} onExitComplete={toggleSlideNext}>
          <SliderRow
            variants={rowVariants}
            key={page}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 0.5 }}>
           { data.length > 0 && data.slice(6 * page, 6 * page + 6).map((restaurant) => (
              <Item
                onClick={() => onClickDetail(restaurant.storeId)}
                layoutId={restaurant.storeId + ""}
                key={restaurant.storeId}
                whileHover="hover"
                bgposter={restaurant.storeImg}>
                <Info variants={infoVariants}>
                  <h3>{restaurant.storeName}</h3>
                  <h4>{restaurant.storeType}</h4>
                </Info>
              </Item>
            ))}
            <SliderLeft onClick={onClikLeft}></SliderLeft>
            <SliderRight onClick={onClcikSlid}>
              <RightSvg
                xmlns="http://www.w3.org/2000/svg"
                width="1024"
                height="276.742"
                viewBox="0 0 1024 276.742">
                <motion.path d="..." />
              </RightSvg>
            </SliderRight>
          </SliderRow>
        </AnimatePresence>
      </Slider>
    </Wrapper>
  );
}
export default Homelist;
