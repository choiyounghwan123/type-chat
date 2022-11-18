import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../component/socket";
import styled from "styled-components";

const Login = (): JSX.Element => {
  let navigate = useNavigate();
  const refNickname = useRef<HTMLInputElement>(null);
  const [notice, setNotice] = useState<string>("");

  const onClick = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!refNickname.current) return;

    const {
      current: { value: nickname },
    } = refNickname;

    // 채팅방에 들어 갈 유저를 서버에 전달함
    socket.emit("user login", nickname);
    socket.on("user login", ({ success }) => {
      console.log(success);
      if (!success) {
        setNotice("이미 사용중인 닉네임입니다");
        return;
      }

      navigate("/", {
        state: {
          nickname,
        },
      });
    });
  };

  return (
    <Container>
      <Background />
      <ModalBox>
        <TextBox>
          <Text fontSize={"5rem"}>😀</Text>
          <Text>또 만나서 반가워요!</Text>
        </TextBox>
        <Form onSubmit={onClick}>
          <SInput ref={refNickname} type="text" placeholder="닉네임" />
          <span>{notice}</span>
          <ButtonBox>
            <button type="submit">입장</button>
          </ButtonBox>
        </Form>
      </ModalBox>
    </Container>
  );
};

export default Login;

const ButtonBox = styled.div`
  width: 100%;
  height: 3rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  background-color: #5f9dfa;
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    width: 100%;
    height: 100%;
  }
`;

const SInput = styled.input`
  width: 100%;
  height: 3rem;
  border-radius: 0.5rem;
  padding: 0 1rem;
  outline: 1px solid #5f9dfa;
  background-color: #1f2229;
`;

const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: auto;
  gap: 1rem;
`;

const Text = styled.span`
  font-size: ${({ fontSize }: { fontSize?: string }) => fontSize ?? "1rem"};
  font-weight: 600;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  max-width: 25rem;
  max-height: 20rem;
  background-color: #2c3039;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  z-index: 999;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(0.15rem) brightness(0.8);
  z-index: 100;
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  color: #ffffff;
`;
