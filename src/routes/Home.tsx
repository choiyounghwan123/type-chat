import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { socket } from "../component/socket";

const Home = () =>{

    let location = useLocation();
    let nickName = location.state.nickName;

    let socket1 = io('http://localhost8080');

    useEffect(()=>{
        socket.emit('add user',nickName);
    })

    return(
      <div>
        <p>Home</p>
        <p>{nickName}</p>
      </div>
    )
}

export default Home;