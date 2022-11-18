import { FormEvent, useEffect, useRef, useState } from "react";
import { socket } from "component/socket";
import { User, ChatData } from "types";
import styled from "styled-components";
import { scrollBottom } from "function/client";
import useUser from "hooks/useUser";
import { useLocation } from "react-router-dom";
import Send from "assets/svgs/Send";

const ChatBox = () => {
  const { user } = useUser();
  const refMessageInput = useRef<HTMLInputElement>(null);
  const whisper = useRef<HTMLInputElement>(null);
  const refChatHistoryBox = useRef<HTMLDivElement>(null);
  const [chatHistory, setChatHistory] = useState<ChatData[]>([]);
  const { state } = useLocation();

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

  // 채팅 서버에 전달
  const onSubmitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!refMessageInput.current) return;

    const {
      current: { value },
    } = refMessageInput;

    sendMsg(value);
    refMessageInput.current.value = "";
  };

  // chatHistory 업데이트 시 스크롤을 맨 아래로 내림
  useEffect(() => {
    const { current } = refChatHistoryBox;

    if (current) {
      scrollBottom(current);
    }
  }, [chatHistory]);

  // 채팅방에 접속시 공지
  useEffect(() => {
    socket.on("user in", (_, { userName }: User) => {
      setChatHistory(
        chatHistory.concat({
          message: `${userName}님이 방에 들어왔어요`,
          user: {
            userName: "system",
            id: "system",
          },
        })
      );
    });
  }, [chatHistory, state]);

  // 채팅방에 있던 유저가 나갔을 때, 공지
  useEffect(() => {
    socket.on("user left", (_, { userName }: User) => {
      setChatHistory(
        chatHistory.concat({
          message: `${userName}님이 방을 탈출했어요`,
          user: {
            userName: "system",
            id: "system",
          },
        })
      );
    });
  }, [chatHistory, state]);

  // 채팅이 입력되면 채팅 목록 업데이트
  useEffect(() => {
    socket.on("message", (message: ChatData) => {
      setChatHistory(chatHistory.concat(message)); //all
    });

    return () => {
      socket.off("message");
    };
  }, [chatHistory]);

  return (
    <>
      <Container>
        <ChatHistoryBox ref={refChatHistoryBox}>
          {chatHistory.map(({ user: { id, userName }, message }) =>
            id === "system" ? (
              <ChatLogSystem key={id}>{message}</ChatLogSystem>
            ) : (
              <ChatLog key={id} isMe={user?.id === id}>
                <Chat isMe={user?.id === id}>{`${userName}: ${message}`}</Chat>
              </ChatLog>
            )
          )}
        </ChatHistoryBox>
        <Form onSubmit={onSubmitMessage}>
          {/* <input type="text" placeholder="누구에게 보낼까요?" ref={whisper} /> */}
          <MessageInput
            type="text"
            placeholder="어떤 말을 할까요?"
            ref={refMessageInput}
          />
          <SendButton>
            <button type="submit">
              <Send width={32} height={32} />
            </button>
          </SendButton>
        </Form>
      </Container>
    </>
  );
};

export default ChatBox;

const SendButton = styled.div`
  background-color: #4c7dfe;
  width: 3rem;
  height: 100%;
  button {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const MessageInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  padding: 0 1rem;
`;

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
`;

const ChatLogSystem = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999999;
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
  padding: 1rem;
  ::-webkit-scrollbar {
    width: 0rem;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #3e404c;
`;
