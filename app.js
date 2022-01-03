const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");    
});

app.post("/", function(req, res){

    const query= req.body.cityName;
    const apiKey = ""; //enter your api key from https://openweathermap.org
    const unit = "imperial";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const feels_like = weatherData.main.feels_like;
            const description = weatherData.weather[0].main;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            console.log(temp)
            console.log(feels_like);
            console.log(description);
            console.log(icon);
            console.log(imageURL);

            res.write("<p>Current Sky Condition: " + description +"</p>");
            res.write("<h1>The temperture in " + query + " is " + temp + " degrees fahrenheit</h1>");
            res.write('<head><meta charset="utf-8"></head>');
            res.write("<img width=200 src=" + imageURL + ">");

            res.send();
        })
    });
})


app.listen(3000, function() {
    console.log("Server is running on port 3000.");
})
