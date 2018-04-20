var path = require('path');
var express = require('express');
var app = express();
var port = getPort();

app.use(express.static('dist'));

app.listen(port, function () {
    console.log('Client running on *:' + port);
});

function getPort() {
    var argumentIndex = process.argv.indexOf('--port');
    if (argumentIndex > -1) {
        return process.argv[argumentIndex + 1];
    }

    return process.env.SIMPLE_CHAT_CLIENT_PORT || 3000;
}