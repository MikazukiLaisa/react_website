// express
const express = require('express');
var http = require('http');
const app = express();

// socket.ioをrequire
var server = http.createServer(app);
var io = require('socket.io').listen(server);

const PORT = process.env.PORT || 3000

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Max-Age', '86400');
    res.header("Content-Security-Policy: default-src 'self' font-src '*'");
    next();
  });

// GET
app.get('/blog', (req, res) => {
  const blog = decodeURIComponent(req.query.blog)
  console.log("get request accept")
  //res.send("Hello world from server")
  const path = "blogs/" + blog;
  res.send(null);
});

app.get("/chat", (req, res) => {

})

// クライアントが接続してきたときの処理
//どこのURLにコネクションしてるんですか？
io.sockets.on('connection', function(socket) { //2
    console.log('connection');
    socket.on('message', function(data) { //4
        console.log('message');
        io.sockets.emit('message', { value: data.value });
    });
    socket.on('disconnect', function() {
    console.log('disconnect');
  });
});



// listen
app.listen(PORT, () => {
 console.log('Example app listening on port '+PORT+' !');
});
