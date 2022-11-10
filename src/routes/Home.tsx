import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { socket } from "../component/socket";

const Home = () =>{

    let location = useLocation();
    let nickName = location.state.nickName;
    let msg=useRef<HTMLInputElement>(null);
    let name ='';

    useEffect(()=>{
        socket.emit('add user',nickName);
    },[])

    socket.on('message',msg=>{
      console.log(msg);
    })
  

    const onClick = () =>{
      if(msg.current){
       socket.emit('new msg',msg.current.value);
       msg.current.value ='';
      }
    }



    return(
      <div>
        <p>Home</p>
        <p>{nickName}님</p>
        <input type='text' placeholder="msg" ref={msg} onKeyPress={(e:React.KeyboardEvent<HTMLElement>)=>{
          if(e.key === 'Enter'){
            onClick();
          }
        }}></input>
        <button onClick={onClick}>전송</button>
      </div>
    )
}

export default Home;