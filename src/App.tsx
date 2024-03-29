import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import CommonButton from "./components/CommonButton";
import LogOutButton from "./components/LogOutButton";
import { auth } from "./fbase";
import { isLogIn, kakaoState, naverState } from "./recoil/atoms";

const Wrap = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #1e90ff;
`;

const Main = styled.main`
  width: 400px;
  height: 500px;
  background-color: #f1f2f6;
  border-radius: 30px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 800;
  margin: 50px 0;
`;

const Buttons = styled.section`
  display: flex;
  flex-direction: column;
  width: 200px;
  margin-top: 60px;
`;

declare global {
  interface Window {
    naver_id_login?: any;
  }
}

export type ProviderType = {
  providerName: string;
};

export type PropsType = {
  props: ProviderType;
};

function App() {
  const [userName, setUserName] = useState<string | null>(null);
  const [login, setLogIn] = useRecoilState(isLogIn);
  const [naverToken, setNaverToken] = useRecoilState(naverState);
  const [kakaoCode, setKakaoCode] = useRecoilState(kakaoState);

  const getNaverToken = (naverLogIn: any) => {
    setNaverToken(naverLogIn.oauthParams.access_token);
  };

  const getKakaoCode = () => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      setKakaoCode(code);
    }
  };

  useEffect(() => {
    // 네이버 소셜 로그인 초기화
    const naverLogIn = new window.naver_id_login(
      process.env.REACT_APP_NAVER_CLIENT_ID,
      encodeURI("http://localhost:3000")
    );
    const state = naverLogIn.getUniqState();
    naverLogIn.setButton("green", 3, 43);
    naverLogIn.setDomain("http://localhost:3000");
    naverLogIn.setState(state);
    naverLogIn.init_naver_id_login();

    getNaverToken(naverLogIn);

    // 카카오 인가코드 가져오기
    getKakaoCode();

    // Firebase를 이용한 구글, 깃허브 소셜 로그인 확인
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
        setLogIn(true);
      } else {
        setUserName(null);
        setLogIn(false);
      }
    });
  }, []);

  // 네이버 카카오 로그인(토큰,코드)여부 확인
  return (
    <Wrap>
      {!login && !naverToken && !kakaoCode ? (
        <Main>
          <Title>✨Social LogIn✨</Title>
          <h3>원하는 소셜미디어 계정으로 로그인하세요.</h3>
          <Buttons>
            <CommonButton props={{ providerName: "Google" }}></CommonButton>
            <CommonButton props={{ providerName: "GitHub" }}></CommonButton>
            <CommonButton props={{ providerName: "Kakao" }}></CommonButton>
            <div id="naver_id_login"></div>
          </Buttons>
        </Main>
      ) : (
        <Main>
          <Title>Hello!! {userName}</Title>
          <LogOutButton />
        </Main>
      )}
    </Wrap>
  );
}

export default App;
