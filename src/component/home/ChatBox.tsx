import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { socket } from "component/socket";
import { User, ChatData } from "types";
import styled from "styled-components";
import { scrollBottom } from "function/client";

interface Props {
  user: User;
}

const ChatBox = ({ user }: Props) => {
  const [message, setMessage] = useState<string>("");
  const whisper = useRef<HTMLInputElement>(null);
  const refChatHistoryBox = useRef<HTMLDivElement>(null);
  const [chatHistory, setChatHistory] = useState<ChatData[]>([]);

  const sendMsg = (message: string) => {
    if (!user) return;

    if (whisper.current?.value) {
      socket.emit("new msg", {
        msg: message,
        username: whisper.current.value,
        me: user,
      });
    } else {
      socket.emit("new msg", {
        msg: message,
        me: user,
      });
    }
  };

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

    sendMsg(message);
    setMessage("");
  };

  // chatHistory 업데이트 시 스크롤을 맨 아래로 내림
  useEffect(() => {
    const { current } = refChatHistoryBox;

    if (current) {
      scrollBottom(current);
    }
  }, [chatHistory]);

  // 유저가 채팅방에 접속했다고 알림
  useEffect(() => {
    socket.emit("add user");
  }, []);

  // 채팅방에 접속시 공지
  useEffect(() => {
    socket.on("user in", (_, { userName }: User) => {
      // setChatHistory((prev) => [
      //   ...prev,
      //   {
      //     message: `${userName}님이 방에 들어왔어요`,
      //     user: {
      //       userName: "system",
      //       id: "system",
      //     },
      //   },
      // ]);

      setChatHistory(chatHistory.concat( {message: `${userName}님이 방에 들어왔어요`,
      user: {
        userName: "system",
        id: "system",
      }},))
    });
  });

  // 채팅방에 있던 유저가 나갔을 때, 공지
  useEffect(() => {
    socket.on("user left", (_, { userName }: User) => {
      // setChatHistory((prev) => [
      //   ...prev,
      //   {
      //     message: `${userName}님이 방을 탈출했어요`,
      //     user: {
      //       userName: "system",
      //       id: "system",
      //     },
      //   },
      // ]);

      setChatHistory(chatHistory.concat( {
        message: `${userName}님이 방을 탈출했어요`,
        user: {
          userName: "system",
          id: "system",
        },
      }));

    });
  });

  // 채팅이 입력되면 채팅 목록 업데이트
  useEffect(() => {
    socket.on("message", (message: ChatData) => {
      setChatHistory(chatHistory.concat(message)); //all
    });

    return ()=>{
      socket.off('message')
    }

  });

  return (
    <>
      <Container>
        <ChatHistoryBox ref={refChatHistoryBox}>
          {chatHistory.map(({ user: { id, userName }, message }, index) => (
            <ChatLog key={index} isMe={user.id === id}>
              <Chat isMe={user.id === id}>{`${userName}: ${message}`}</Chat>
            </ChatLog>
          ))}
        </ChatHistoryBox>
        <Form onSubmit={onSubmitMessage}>
          <input type="text" placeholder="누구에게 보낼까요?" ref={whisper} />
          <input
            type="text"
            placeholder="어떤 말을 할까요?"
            onChange={onChangeMessage}
            value={message}
          />
          <button type="submit">전송</button>
        </Form>
      </Container>
    </>
  );
};

export default ChatBox;

const Chat = styled.div`
  padding: 10px;
  background-color: ${({ isMe }: { isMe: boolean }) =>
    isMe ? "#4C7DFE" : "#E2E2E2"};
  color: ${({ isMe }: { isMe: boolean }) => (isMe ? "#FFFFFF" : "#000000")};
  border-radius: 0.5rem;
  width: fit-content;
  max-width: 70%;
  height: auto;
`;

const ChatLog = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: ${({ isMe }: { isMe: boolean }) =>
    isMe ? "flex-end" : "flex-start"};
  padding: 0 1rem;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 3rem;
`;

const ChatHistoryBox = styled.div`
  width: 100%;
  height: calc(100% - 3rem);
  overflow-y: scroll;
  gap: 1rem;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;
