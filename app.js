var express = require('express');
 request = require('request'),
 app = express(),
 router = express.Router(),
 port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

require('./routes/index')(router);

app.use('/api', router);

app.listen(port);
console.log('Server running on port number ', port);
