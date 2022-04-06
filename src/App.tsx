import { useEffect, useState } from "react";
import styled from "styled-components";
import CommonButton from "./components/CommonButton";
import LogOutButton from "./components/LogOutButton";
import { auth } from "./fbase";

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

export type ProviderType = {
  providerName: string;
};

function App() {
  const authService = auth;
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else {
        setUserName(null);
      }
    });
  }, []);

  return (
    <Wrap>
      {!userName ? (
        <Main>
          <Title>✨Social LogIn✨</Title>
          <h3>원하는 소셜미디어 계정으로 로그인하세요.</h3>
          <Buttons>
            <CommonButton props={{ providerName: "Google" }}></CommonButton>
            <CommonButton props={{ providerName: "GitHub" }}></CommonButton>
            <CommonButton props={{ providerName: "Naver" }}></CommonButton>
            <CommonButton props={{ providerName: "Kakao" }}></CommonButton>
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
