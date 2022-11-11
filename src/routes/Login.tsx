import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../component/socket";

const Login = (): JSX.Element => {
  let navigate = useNavigate();
  let [nickName, setNickName] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  const onClick = () => {
    // 채팅방에 들어 갈 유저를 서버에 전달함
    socket.emit("user login", nickName);

    navigate("/main", {
      state: {
        nickName: nickName,
      },
    });
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      onClick();
    }
  };

  return (
    <div>
      <p>Login Page</p>
      <input
        type="text"
        placeholder="NickName"
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <button onClick={onClick}>입장</button>
    </div>
  );
};

export default Login;
