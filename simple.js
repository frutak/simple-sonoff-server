var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 5000

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")

wss.on("connection", function (str) {
    console.log("websocket connection open")
    var data = JSON.parse(str)
    console.log("data %s", JSON.stringify(data))
    res = {
                "error": 0,
                "deviceid": data.deviceid,
                "apikey": "111111111-1111-1111-1111-111111111111"
            }
  }, 1000)
  var r = JSON.stringify(res);
  wss.sendText(r);

  })
