import styled from "styled-components";
import { auth } from "../fbase";

const Button = styled.button`
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
  const handleLogOut = () => {
    auth.signOut();
  };

  return <Button onClick={handleLogOut}>LogOut</Button>;
};
export default LogOutButton;
