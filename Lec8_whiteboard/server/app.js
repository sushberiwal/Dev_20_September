// npm init -y
// nom install express
// npm install nodemon
// npm install socket.io

// socket enabled server


const app = require('express')(); // app server is created
const http = require('http').createServer(app); // http enabled server
const io = require('socket.io')(http); // socket is enabled


io.on('connection', function(socket){
  console.log(` ${socket.id} is connected`);
  
  socket.on("mousedown" , function(point){
      socket.broadcast.emit("md" , point );
  })

  socket.on("mousemove" , function(point){
    socket.broadcast.emit("mm" , point );
  })


});

http.listen(3000, function(){
  console.log('listening on 3000 port');
});


// emit("connection" , data ) , on("connection" , function(){})