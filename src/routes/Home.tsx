import { useEffect, useState } from "react";
import ChatBox from "component/home/ChatBox";
import EnterUsersBox from "component/home/EnterUsersBox";
import { socket } from "component/socket";
import { User } from "types";
import styled from "styled-components";
import { Outlet, useLocation } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState<User>();
  const [users, setUsers] = useState<User[]>([]);
  const location = useLocation();
  console.log(location.state);
  // const roomNumber = useRef<HTMLInputElement>(null);

  // 클라이언트 소켓(?)에 연결된 유저 정보를 가져옴
  useEffect(() => {
    socket.on("user info", (user: User) => {
      setUser(user);
      console.log(user);
    });
  }, []);

  // 채팅방에 접속한 유저 목록을 가져옴
  useEffect(() => {
    socket.on("user in", (users: User[]) => {
      setUsers(users);
    });
  }, []);

  // 채팅방에 있던 유저가 나갔을 때, 유저 목록 업데이트
  useEffect(() => {
    socket.on("user left", (users: User[]) => {
      setUsers(users);
    });
  }, []);

  // const makeRoom = () => {
  //   if (roomNumber.current) {
  //     socket.emit("joinroom", roomNumber.current.value);
  //   }
  // };

  return (
    <>
      <Container>
        {user && (
          <EnterUsersBox
            myUser={user}
            otherUsers={users.filter(({ id }) => id !== user.id)}
          />
        )}
        {user && <ChatBox user={user} />}
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
  gap: 1rem;
`;
