const app = require('express')();
const http  = require('http').createServer(app);
const io = require('socket.io')(http,{
    cors:{
        origin:"*"
    }
});

io.on('connection', socket =>{

    let numUser = 0;
    console.log(' a user connected');


    socket.on('add user',username=>{
        console.log(username+"님이 입장하셧습니다");
        numUser++;
    })
})

http.listen(8080,()=>{
    console.log('server is running on 8080 port');
})
