const { pushUser, removeUser } = require("./src/function/server");

const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

const users = [];

io.on("connection", (socket) => {
  console.log(" a user connected");

  // 각 연결마다 고유한 유저를 생성
  const currentUser = {
    id: socket.id,
    userName: `익명 ${Date.now()}`,
  };

  // 유저 로그인 후 채팅방에 들어갈 때, 유저 닉네임 할당
  socket.on("user login", (nickname) => {
    if (users.find(({ userName }) => userName === nickname)) {
      socket.emit("user login valid", { success: false });

      return;
    }

    currentUser["userName"] = nickname;

    // 로그인 유저 정보 전달
    socket.emit("user login valid", { success: true });
    socket.emit("user info", currentUser);
    pushUser(users, currentUser); // 소켓 접속 유저 목록에 추가
    io.sockets.emit("user in", users, currentUser); // 소켓 접속 유저 목록 업데이트
  });

  // 유저가 채팅방에 들어왔을 때
  socket.on("add user", () => {
    const { userName: username } = currentUser;

    console.log(username + "님이 입장하셧습니다");

    socket.on("joinroom", (roomname) => {
      socket.join(roomname);
      console.log(roomname + "번방 접속");
    });
  });

  socket.on("new msg", (msg) => {
    const chatData = {
      message: msg.msg,
      user: msg.me,
    };
    console.log(msg);

    if (!msg.username) {
      // All chat
      io.sockets.emit("message", chatData);
      return;
    }

    const target = users.find((user) => user.userName === msg.username);

    if (target) {
      // 1:1 chat
      io.to(target.id).emit("message", chatData); // 상대방
      io.to(msg.me.id).emit("message", chatData); // 본인
    }
  });

  // 소켓 연결 끊길 때,
  socket.on("disconnecting", (reason) => {
    removeUser(users, currentUser.id); // 유저 목록에서 제거

    socket.broadcast.emit("user left", users, currentUser); // 유저 목록 업데이트
  });
});

http.listen(8080, () => {
  console.log("server is running on 8080 port");
});
