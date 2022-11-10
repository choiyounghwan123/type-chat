import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { socket } from "../component/socket";

interface User {
  userName: string;
  id: string;
}

const Home = () => {
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>();
  const [message, setMessage] = useState<string>("");
  // let roomNumber = useRef<HTMLInputElement>(null);

  // 유저가 채팅방에 접속했다고 알림
  useEffect(() => {
    socket.emit("add user");
  }, []);

  // 클라이언트 소켓(?)에 연결된 유저 정보를 가져옴
  useEffect(() => {
    socket.on("user info", (user: User) => {
      setUser(user);
    });
  }, []);

  // 채팅방에 접속한 유저 목록을 가져옴
  useEffect(() => {
    socket.on("user in", (users: User[], newUser: User) => {
      setUsers(users);
      setChatHistory((prev) => [
        ...prev,
        `${newUser.userName}님이 입장하셨습니다.`,
      ]);
    });
  }, []);

  // 채팅이 입력되면 채팅 목록 업데이트
  useEffect(() => {
    socket.on("message", (message) => {
      setChatHistory((prev) => [...prev, message]); //all
    });
  }, []);

  // 채팅방에 있던 유저가 나갔을 때, 유저 목록 업데이트
  useEffect(() => {
    socket.on("user left", (users: User[], leftUser: User) => {
      setUsers(users);
      setChatHistory((prev) => [
        ...prev,
        `${leftUser.userName}님이 나갔습니다.`,
      ]);
    });
  }, []);

  // 채팅 입력
  const onChangeMessage = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;

    setMessage(value);
  };

  // 채팅 서버에 전달
  const onSubmitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    socket.emit("new msg", {
      msg: message,
      // username:'choi',
      me: user?.userName,
    });
    setMessage("");
  };

  // const makeRoom = () => {
  //   if (roomNumber.current) {
  //     socket.emit("joinroom", roomNumber.current.value);
  //   }
  // };

  return (
    <div>
      <p>Home</p>
      <p>{user?.userName}님</p>
      <div>
        {users.map(({ id, userName }) => (
          <p key={id}>접속 중 : {userName}</p>
        ))}
      </div>
      <form onSubmit={onSubmitMessage}>
        <input
          type="text"
          placeholder="msg"
          onChange={onChangeMessage}
          value={message}
        />
        <button type="submit">전송</button>
      </form>
      <div>
        <h2>Message</h2>
        {chatHistory.map((message, index) => {
          return <p key={index}>{message}</p>;
        })}
      </div>
    </div>
  );
};

export default Home;
