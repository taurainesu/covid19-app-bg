//setup  express
var express = require('express');
var app = express();

//setup templating engine
app.set('view engine', 'ejs');

//middleware to access static files. Will check all folders for static files
app.use("/", express.static('./'));

//listen on port 4550
var listenPort = 4600;
app.listen(listenPort, ()=>{
    console.log("App running on port "+listenPort);
});


//routes
app.get('/', function(req, res){

    var request = require('request');
    var options = {
        'method': 'GET',
        'url': 'https://api.covid19api.com/live/country/zimbabwe/status/confirmed',
        'headers': {
        }
    };
    request(options, function (error, response) { 
        if (error) throw new Error(error);
        console.log(response.body);       
        res.render('index', {apiData:response.body});
    });
});