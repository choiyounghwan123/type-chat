const app = require('express')();
const http  = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connetion', socket =>{
    console.log(' a user connected');
})

http.listen(8080,()=>{
    console.log('server is running on 8080 port');
})
