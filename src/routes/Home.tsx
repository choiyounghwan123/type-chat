import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { socket } from "../component/socket";

const Home = () =>{

    let location = useLocation();
    let nickName = location.state.nickName;
    let [msg,setMsg]=useState('');

    useEffect(()=>{
        socket.emit('add user',nickName);
    },[])

    const sendMsg = () =>{

    }

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setMsg(e.target.value);
    }

    const onClick = () =>{
      socket.emit('new msg',msg);
      setMsg('');
    }



    return(
      <div>
        <p>Home</p>
        <p>{nickName}님</p>
        <input type='text' placeholder="msg" value={msg} onChange={onChange} onKeyPress={(e:React.KeyboardEvent<HTMLElement>)=>{
          if(e.key === 'Enter'){
            onClick();
          }
        }}></input>
        <button onClick={onClick}>전송</button>
      </div>
    )
}

export default Home;