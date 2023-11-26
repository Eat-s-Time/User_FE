import styled from "styled-components";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 80px;
  top: 0;
  font-size: 14px;
`;

const HoverCircle = styled(motion.span)`
  position: absolute;
  border-radius: 5px;
  height: 10px;
  width: 10px;
  background-color: orange;
  bottom: -15px;
  //정중앙에 위치하게 하는 left right margin
  left: 0;
  right: 0;
  margin: 0 auto;
`;

const Search = styled.form`
  color: white;
  svg {
    margin-top: 10px;
    height: 23px;
  }
  margin-right: 105px;
`;

const SearchBar = styled(motion.input)`
  transform-origin: right center;
  margin-right: 50px;
  height: 40px;
  width: 270px;
  position: absolute;
  right: 0px;
  padding: 5px 30px;
  z-index: -1;
  font-size: 16px;
  color: white;
  background-color: transparent;
  border: 1px solid white;
`;
const SearchResult = styled(motion.div)`
  transform-origin: right center;
  margin-right: 50px;
  margin-top: 52px;
  height: 300px;
  width: 332px;
  position: absolute;
  right: 0px;
  z-index: -1;
  font-size: 16px;
  color: white;
  background-color: black;
`;

const SearchResultItem = styled(motion.div)`
  font-size: 16px;
  margin-top: 10px;
  border-bottom: 1px solid grey;
`;
const SearchResultText = styled(motion.h1)`
  font-size: 16px;
  margin-bottom: 10px;
  margin-left: 30px;
`;

const NavIn = styled.div`
  display: flex;
  align-items: center;
`;

const navScrollVar = {
  top: { backgroundColor: "rgba(0,0,0,0)" },
  scroll: { backgroundColor: "rgba(0,0,0,1)" },
};

const Logo = styled(motion.h1)`
  margin-left: 50px;
  margin-right: 50px;
  width: 95px;
  height: 25px;
  color: orange;
`;


// 아이템 리스트
const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  color: darkgray;
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 20px;
  &:hover {
    color: darkgray;
  }
`;
interface Store {
  storeId: number;
  storeName: string;
  storePhone: string;
  storeContent: string;
  storeLocation: string;
  // ...other properties
}

function SearchHeader() {
  const [serachOpen, setSearchOpen] = useState(false);
  //useRouteMatch를 통해 현재 위치가 어디인지
  //만약에 "/"에 있다면 , HoverMatch가 위치해야함
  const myPageMatch = useRouteMatch("/mypage");
  const serachBarAnimation = useAnimation();
  const navAnimation = useAnimation();
  const { scrollY } = useViewportScroll();
  const [keywords, setKeywords] = useState("");
  const history = useHistory();
  const [searchResults, setSearchResults] = useState<
    { id: number; name: string }[]
  >([]);

  //검색바 열었을 때 애니메이션
  const toggleSearch = () => {
    if (serachOpen) {
      //서치바가 열려 있으면 닫힘 애니메이션
      serachBarAnimation.start({ scaleX: 0 });
    } else {
      //서치바가 닫혀있다면열림 애니메이션
      serachBarAnimation.start({ scaleX: 1 });
    }
    setSearchOpen((prev) => !prev);
  };
  useEffect(() => {
    //헤더 흐려지는 애니메이션
    scrollY.onChange(() => {
      if (scrollY.get() > 10) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);

  //검색 함수
  // const onVaild = (data: IForm) => {
  //   history.push(`/search?keyword=${data.keyword}`); //검색한 사이트로 이동
  // };

  //---------------검색기능---------------------


  useEffect(() => {
    const getSearch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/owner/storename/${keywords}/search`
        );
        const stores = response.data.map((store: Store) => ({
          id: store.storeId,
          name: store.storeName,
        }));
        setSearchResults(stores);
      } catch (error) {
        console.error("검색 api 오류: ", error);
      }
    };
    getSearch();
  }, [keywords]);


  const SearchResultItemClicked = (id: number) => {
    history.push(`/user/detail/${id}`);
  };

  return (
    <>
      <Nav variants={navScrollVar} animate={navAnimation} initial={"top"}>
        <NavIn>
          <Logo >잇츠타임</Logo>
          <Items>
            <Item>
              <Link to="/user/mypage">
                마이페이지{myPageMatch && <HoverCircle />}
              </Link>
            </Item>
          </Items>
        </NavIn>
        <NavIn>
          <Search>
            <motion.svg
              onClick={toggleSearch}
              animate={{ x: serachOpen ? -185 : 0 }}
              transition={{ type: "linear" }}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </motion.svg>
            <form onSubmit={(e) => e.preventDefault()}>
              <SearchBar
                onInput={(e) =>
                  setKeywords((e.target as HTMLInputElement).value)
                }
                animate={serachBarAnimation}
                initial={{ scaleX: 0 }}
                transition={{ type: "linear" }}
                placeholder="식당을 검색해보세요"
              />
              {keywords ? (
                <SearchResult>
                  {searchResults.map((result) => (
                    <SearchResultItem
                      key={result.id}
                      onClick={() => SearchResultItemClicked(result.id)}>
                      <SearchResultText>{result.name}</SearchResultText>
                    </SearchResultItem>
                  ))}
                </SearchResult>
              ) : null}
            </form>
          </Search>
        </NavIn>
      </Nav>
    </>
  );
}
export default SearchHeader;
