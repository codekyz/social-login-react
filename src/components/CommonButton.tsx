import {
  AuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import React from "react";
import styled from "styled-components";
import { ProviderType } from "../App";
import { auth } from "../fbase";

const Button = styled.button`
  flex-grow: 1;
  border: none;
  background-color: #2f3542;
  color: white;
  padding: 10px 0;
  margin-bottom: 10px;
  border-radius: 35px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: #1e90ff;
  }
`;

type PropsType = {
  props: ProviderType;
};

const CommonButton = ({ props }: PropsType) => {
  const handleLogIn = (event: React.FormEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { innerHTML },
    } = event;
    let provider: AuthProvider;
    if (innerHTML === "Google") {
      provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider);
    } else if (innerHTML === "GitHub") {
      provider = new GithubAuthProvider();
      signInWithPopup(auth, provider);
    } else if (innerHTML === "Naver") {
      console.log("네이버 로그인 요청");
    } else if (innerHTML === "Kakao") {
      console.log("카카오 로그인 요청");
    }
  };

  return (
    <Button onClick={(event) => handleLogIn(event)}>
      {props.providerName}
    </Button>
  );
};

export default CommonButton;
