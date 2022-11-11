import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ():JSX.Element =>{

    

    let navigate = useNavigate();
    let [nickName,setNickName]=useState('');
 


    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setNickName(e.target.value);
    };

    const onClick = () =>{
        navigate('/main',{state:{
            nickName:nickName,
        }});
    }

    const onKeyPress = (e:React.KeyboardEvent<HTMLElement>) =>{
        if(e.key === 'Enter'){
            onClick();
        }
    }

    return(
        <div>
        <p>Login Page</p>
        <input type='text' placeholder="NickName" onChange={onChange} onKeyPress={onKeyPress}></input>
        <button onClick={onClick}>입장</button>
        </div>
    )
}

export default Login;