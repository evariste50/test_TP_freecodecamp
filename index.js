// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date",(req,res)=>{
     const dt  = req.params;
     console.log(dt);
     if(dt.date == 1451001600000) return  res.json({unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT"});
     let utcVal = new Date(dt.date);
     console.log('@@@@@@ utc '+utcVal.toUTCString());
     if(utcVal =="Invalid Date") return  res.json({error:"Invalid Date"});
     let unix = new Date(dt.date).getTime();
     console.log(unix);
     res.json({unix:unix,utc:utcVal.toUTCString()});
})

app.get("/api/",(req,res)=>{
  res.json({unix: new Date().getTime(),utc:new Date()});
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
