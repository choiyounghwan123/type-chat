const app = require('express')();
const http  = require('http').createServer(app);
const io = require('socket.io')(http,{
    cors:{
        origin:"*"
    }
});

let login_id={};

io.on('connection', socket =>{

    let numUser = 0;
    console.log(' a user connected');


    socket.on('add user',username=>{
        console.log(username+"님이 입장하셧습니다");
        numUser++;
        login_id[username]=socket.id;

        socket.broadcast.emit('login',username);

        socket.on('joinroom',(roomname)=>{
            socket.join(roomname);
            console.log(roomname+"번방 접속");
        })

        
        
        
        socket.on('new msg',msg=>{
            console.log(msg);



            let content =`${msg.me}:${msg.msg}`

            if(!msg.username)io.sockets.emit('message',content); // All chat
            
            
            if(login_id[msg.username]){ //1:1 chat
                io.to(login_id[msg.username]).emit('onechat',msg.msg);
                     }

        })

        
     console.log(`user : ${numUser}`);
    })
})

http.listen(8080,()=>{
    console.log('server is running on 8080 port');
})
