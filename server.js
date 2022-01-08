// server.js
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

//API date
app.get('/api/:date', (req,res)=>{
  let response= {};
  var reqDate = req.params.date;

  if(reqDate === null){
    response['unix'] = new Date().getTime();
    response['utc'] = new Date().toUTCString();
    res.json(response);
  }


    var parsedDate = new Date(reqDate);
    if(parsedDate === "Invalid Date"){
      res.json({"error":"Invalid Date"});
    }else {

      if(reqDate.includes('-') || reqDate.includes('/') || reqDate.includes(' ')){

      response['unix'] = new Date(reqDate).getTime();
      response['utc'] = new Date(reqDate).toUTCString();
      //res.json({"unix":reqDate, "utc":dateTimeString});
      
    }else {
      var input = parseInt(reqDate);

      response['unix'] = new Date(input).getTime();
      response['utc'] = new Date(input).toUTCString();
      //res.json({"unix":unixDate, "utc":inputDate});
      
    }

    if(!response['unix'] || !response['utc']){
      res.json({"error":"Invalid Date"});
    }else {
      res.json(response);
    } 
  }
});

app.get('/api/', (req,res)=>{
    let response= {};
    response['unix'] = new Date().getTime();
    response['utc'] = new Date().toUTCString();
    res.json(response);
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
