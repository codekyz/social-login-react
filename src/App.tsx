import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import CommonButton from "./components/CommonButton";
import LogOutButton from "./components/LogOutButton";
import { auth } from "./fbase";
import { naverState } from "./recoil/atoms";

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
  const authService = auth;
  const [userName, setUserName] = useState<string | null>(null);
  const [naverToken, setNaverToken] = useRecoilState(naverState);

  const getNaverToken = (naverLogIn: any) => {
    setNaverToken(naverLogIn.oauthParams.access_token);
  };

  useEffect(() => {
    // Firebase를 이용한 구글, 깃허브 소셜 로그인 확인
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else {
        setUserName(null);
      }
    });
  }, []);

  useEffect(() => {
    // 네이버 소셜 로그인 초기화
    const naverLogIn = new window.naver_id_login(
      process.env.REACT_APP_NAVER_CLIENT_ID,
      encodeURI("http://localhost:3000")
    );
    const state = naverLogIn.getUniqState();
    naverLogIn.setButton("green", 3, 43);
    naverLogIn.setDomain("http://localhose:3000");
    naverLogIn.setState(state);
    naverLogIn.init_naver_id_login();

    getNaverToken(naverLogIn);
  }, []);

  return (
    <Wrap>
      {!userName && !naverToken ? (
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
