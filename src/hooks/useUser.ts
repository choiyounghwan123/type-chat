import { socket } from "component/socket";
import { useEffect, useState } from "react";
import { User } from "types";

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  // 클라이언트 소켓(?)에 연결된 유저 정보를 가져옴
  useEffect(() => {
    socket.on("user info", (user: User) => {
      setUser(user);
    });
  }, []);

  return { user };
};

export default useUser;
