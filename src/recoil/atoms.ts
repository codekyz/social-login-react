import { atom } from "recoil";

export const naverState = atom({
  key: "naverState",
  default: "",
});

export const kakaoURL = atom({
  key: "kakaoURL",
  default: `https://kauth.kakao.com/oauth/authorize?client_id=${
    process.env.REACT_APP_KAKAO_CLIENT_ID
  }&redirect_uri=${"http://localhost:3000"}&response_type=code`,
});

export const kakaoState = atom({
  key: "kakaoState",
  default: "",
});

export const isLogIn = atom({
  key: "isLogIn",
  default: false,
});
