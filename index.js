const request = require('request');
const argv = require('yargs').argv;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'pug')
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

var api_key = '37655193ca4ccb434c6ccb6c7b378e80';
var message='';

app.get('/', function (req, res) {
  res.render('index');
})

app.post('/', function (req, res) {
    
    var cityname = req.body.city;
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=imperial&appid=${api_key}`;
    request(url, function (err, response, body) {
    if(err) {
        console.log('error:', err);
    }
    else {
        let result = JSON.parse(body)
	message+= `Temperature in ${result.name} is `+ convertToCelcius(`${result.main.temp}`) +`°C, ${result.weather[0].main}`;
        message+= `\nMax Temp: `+ convertToCelcius(`${result.main.temp_max}`) +`°C`;
        message+= `\nMin Temp: `+ convertToCelcius(`${result.main.temp_min}`) +`°C`;
        console.log("Msg sent: " + message);
	res.render('index', {msg:message});
	
    }
})
});

function convertToCelcius(temp){
    temp = (temp-32)*5/9;
    temp = Math.round(temp*100)/100;
    return temp;
}

app.listen(4000, function () {
  console.log('Server is running!')
})
