const WebSocket = require('ws')
var http = require("http")
var express = require("express")
var bodyParser = require('body-parser')
var app = express()
var port = process.env.PORT || 5000

app.use(express.static(__dirname + "/"))
// Register body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var server = http.createServer(app)

server.listen(port)

    // Register routes
    app.post('/dispatch/device', function (req, res) {
        log.log('REQ | %s | %s ', req.method, req.url);
        log.trace('REQ | %s', JSON.stringify(req.body));
        res.json({
            "error": 0,
            "reason": "ok",
            "IP": config.server.IP,
            "port": config.server.websocketPort
        });
    });

    // Register routes
    app.get('/', function (req, res) {
        log.log('REQ | %s | %s ', req.method, req.url);
        res.send('OK');
    });


var wss = new WebSocket.Server({ port: port })
console.log("http server listening on %d", port)

console.log("websocket server created")

wss.on("connection", function(ws) {
  ws.on("message", function (str) {
    console.log("websocket connection open")
    var data = JSON.parse(str)
    console.log("data %s", JSON.stringify(data))
    res = {
                "error": 0,
                "deviceid": data.deviceid,
                "apikey": "111111111-1111-1111-1111-111111111111"
            }
    var r = JSON.stringify(res);
    ws.sendText(r);
    console.log("data %s", r)
    res = { action: 'update', value: { switch: "off" }, target: deviceId }
    var r = JSON.stringify(res);
    ws.sendText(r);
    console.log("data %s", r)
  })


  ws.on("close", function() {
    console.log("websocket connection close")
  })
})
