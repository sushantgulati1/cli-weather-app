const req = require('request');

var cityname = 'New York';
var api_key = '*************';
var url = `http://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=imperial&appid=${api_key}`;

req(url, function (err, response, body) {
    if(err) {
        console.log('error:', err);
    }
    else {
        let result = JSON.parse(body)
        var message = `Temperature in ${result.name} is ${result.main.temp}°F`;
        console.log(message);
    }
});
