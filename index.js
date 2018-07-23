const req = require('request');
const argv = require('yargs').argv;

var api_key = '********';
var cityname = argv.c || 'New York';
var url = `http://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=imperial&appid=${api_key}`;
var message='';

req(url, function (err, response, body) {
    if(err) {
        console.log('error:', err);
    }
    else {
        let result = JSON.parse(body)
        message+= `Temperature in ${result.name} is `+ convertToCelcius(`${result.main.temp}`) +`°C, ${result.weather[0].main}`;
        message+= `\nMax Temp: `+ convertToCelcius(`${result.main.temp_max}`) +`°C`;
        message+= `\nMin Temp: `+ convertToCelcius(`${result.main.temp_min}`) +`°C`;
        console.log(message);
    }
});

function convertToCelcius(temp){
    temp = (temp-32)*5/9;
    temp = Math.round(temp*100)/100;
    return temp;
}
