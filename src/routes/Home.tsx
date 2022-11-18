import ChatBox from "component/home/ChatBox";
import EnterUsersBox from "component/home/EnterUsersBox";
import styled from "styled-components";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { socket } from "component/socket";

const Home = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (!state?.nickname) {
      navigate("/login");
      return;
    }

    // 채팅방에 들어 갈 유저를 서버에 전달함
    socket.emit("user login", state.nickname);
  }, [navigate, state]);

  // const roomNumber = useRef<HTMLInputElement>(null);

  // const makeRoom = () => {
  //   if (roomNumber.current) {
  //     socket.emit("joinroom", roomNumber.current.value);
  //   }
  // };

  return (
    <>
      <Container>
        <EnterUsersBox />
        <ChatBox />
      </Container>
      <Outlet />
    </>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;
