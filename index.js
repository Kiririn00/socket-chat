var express = require('express');//load express
var app = express();
var http = require('http').Server(app);//load http intent exoress
var io = require('socket.io')(http);//load socket io and will upgrate this http

//make view
app.get('/', function(req,res){
  res.sendFile(__dirname + '/index.html');
});
app.use(express.static(__dirname + '/public/'));
/*
note: socket will open when browser load and close when browser close
      but data will still in socket(in server memory).
*/
io.on('connection', function(socket){ //revice io connection from client(if open)
  console.log("a user connected");
  socket.on('disconnect', function(){
    console.log("user disconnect");
  });

  socket.on('chat message', function(msg){
    console.log('message:' + msg);
    io.emit('chat message', msg);
  });
});

//create localhost port 3000
http.listen(3000,function(){
  console.log('listening on *:3000');
});
