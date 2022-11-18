import { useEffect, useState } from "react";
import { socket } from "component/socket";
import { User } from "types";

const useUserList = () => {
  const [users, setUsers] = useState<User[]>([]);

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

  return { users };
};

export default useUserList;
