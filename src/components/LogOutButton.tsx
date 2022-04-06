import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { auth } from "../fbase";
import { isLogIn, kakaoState, naverState } from "../recoil/atoms";

export const Button = styled.button`
  width: 150px;
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

const LogOutButton = () => {
  const [naverToken, setNaverToken] = useRecoilState(naverState);
  const [kakaoCode, setKakaoCode] = useRecoilState(kakaoState);

  const navigate = useNavigate();
  const handleLogOut = () => {
    if (naverToken) {
      setNaverToken("");
      navigate("/");
    } else if (kakaoCode) {
      setKakaoCode("");
      navigate("/");
    } else {
      auth.signOut();
    }
    window.location.reload();
    // 새로고침 하지않으면 네이버로그인 버튼이 사라짐. 렌더링문제인듯함
  };

  return <Button onClick={handleLogOut}>LogOut</Button>;
};
export default LogOutButton;
