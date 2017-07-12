var express = require('express');
var bodyparser = require('body-parser');
var http = require('http');
var https = require('https')

var app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true
}));

var httpServer = http.createServer(app);

httpServer.listen(8085);

var movs = [];

var defplayers = 1;

app.get('/number', function(req, res) {
    res.send('' + defplayers++);
});

app.get('/getmov', function(req, res) {
    console.log("tentativa de get de movimentos de oponente");
    var player = req.query.player;
    if(movs.length == 0 || movs[0].player == player) {
        res.send("null");
    } else {
        console.log("movimento enviado corretamente");
        res.send(movs.pop().movimento);
    }
});

app.get('/sendmov', function(req, res) {
    var mov = req.query.mov;
    var player = req.query.player;
    mov =  JSON.parse(mov);
    movs.push({
        "movimento": mov,
        "player": player
});
    console.log("movimentaçao recebida " + movs[0]);
    res.send('ok');
});
