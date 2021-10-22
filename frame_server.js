var fs = require('fs');
const WebSocket = require('ws');

const PORT = 8080;

const wsServer = new WebSocket.Server({
    port: PORT
});
wsServer.on('connection', function (socket) {

    console.log("A client just connected");

    socket.on('message', function (msg) {
        console.log("Received message from client: " + msg);

        var array = fs.readFileSync('./dtl.csv').toString().split("\n");
        var i = 0;
        setInterval(() => {
            if (i == array.length) {
                i = 0;
            }
            socket.send(JSON.stringify(array[i++]));
        }, 1000 / 60);



    });
    socket.on('close', function () {
        console.log('Client disconnected');
    })
});

console.log("Server is listening on port " + PORT);

