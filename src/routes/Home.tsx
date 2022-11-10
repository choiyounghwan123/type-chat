import React, { useEffect, useRef, useState, useTransition } from "react";
import { useLocation } from "react-router-dom";
import { socket } from "../component/socket";

const Home = () =>{

    let location = useLocation();
    let nickName = location.state.nickName;
    let msg=useRef<HTMLInputElement>(null);
    let [content,setContent] = useState<string[]>([]);
    let [userName,setUserName] = useState<string[]>([]);
    let roomNumber = useRef<HTMLInputElement>(null);
    useEffect(()=>{
        socket.emit('add user',nickName);

    },[])

    useEffect(()=>{
      socket.on('login',(username)=>{
        setUserName(userName=>[userName,...username]);
      })
    },[socket])

    useEffect(()=>{

      socket.on('message',(msg)=>{
        setContent(content.concat(msg)); //all
      })

      socket.on('onechat',msg=>{ //1:1
        console.log('succses');
      })

    })



    const onClick = () =>{
      if(msg.current){
       socket.emit('new msg',{
        msg:msg.current.value,
        // username:'choi',
        me:nickName,
       });
       msg.current.value ='';
      }
    }

    const makeRoom = () =>{
      if(roomNumber.current){
        socket.emit('joinroom',roomNumber.current.value);
      }
    }




    return(
      <div>
        <p>Home</p>
        <p>{nickName}님</p>
        <div>
          {
            userName.map((a,i)=>{
              return(
                <>
                <p key={i}>접속 중 : {a}</p>
                </>
              )
            })
          }
        </div>
        <input type='text' placeholder="msg" ref={msg} onKeyPress={(e:React.KeyboardEvent<HTMLElement>)=>{
          if(e.key === 'Enter'){
            onClick();
          }
        }}></input>
        <button onClick={onClick}>전송</button>
        <div>
          <h2>Message</h2>
          {
            content.map((a,i)=>{
              return (
                
                <p key={i}>{a}</p>
  
              )
            })
          }
        </div>
      </div>
    )
}

export default Home;