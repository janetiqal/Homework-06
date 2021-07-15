var ApiKey= "6845bd9653c312c4a4d4b0a988d5d986";
// 41.8781° N, 87.6298° W

function getAPI(){
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=41.8781&lon=-87.6298&appid=" + ApiKey + "&units=imperial")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)
        var currentTemp = data.current.temp;
        var wind = data.current.wind_speed;
        var humidity = data.current.humidity;
        var uvIndex =data.current.uvi;
        console.log(currentTemp, wind, humidity, uvIndex)
    })
}
getAPI();

