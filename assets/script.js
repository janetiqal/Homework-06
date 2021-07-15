const ApiKey= "6845bd9653c312c4a4d4b0a988d5d986";
// 41.8781° N, -87.6298° W
const containerElement= document.getElementById("currentSearch");
containerElement.classList.add("card");
const searchButton= document.querySelector("button");
const fiveDayElement= document.getElementById("fiveDayForecast");
fiveDayElement.classList.add("card");

function getAPI(){
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=41.8781&lon=-87.6298&appid=" + ApiKey + "&units=imperial")
    .then(function(response){
        // console.log(response);
        return response.json();
    })
    .then(function(data){
        // console.log(data)
        //Extracted the 4 variables I wanted to display for my current weather forecast
        var currentTemp = data.current.temp;
        var wind = data.current.wind_speed;
        var humidity = data.current.humidity;
        var uvIndex =data.current.uvi;
        console.log(currentTemp, wind, humidity, uvIndex);
        //Temp being added to page
        var tempElement=document.createElement('h6');
        tempElement.textContent=`Temperature: ${currentTemp}F`;
          //Wind being added to page
        var windElement=document.createElement('h6');
        windElement.textContent=`Wind Speed: ${wind} MPH`;
          //UV being added to page
        var UVElement=document.createElement('h6');
        UVElement.textContent=`UV Index: ${uvIndex}`;
          //Humidity being added to page
        var humidityElement= document.createElement('h6');
        humidityElement.textContent=`Humidty: ${humidity}%`;

        //appending all 4 variable to the div element w class card. 
        containerElement.append(tempElement, windElement, UVElement, humidityElement);
    })
}
searchButton.addEventListener("click", function(){
    console.log("clicked")
    var citySearched= document.getElementById("userCityChoice").value;
    var cityElement= document.createElement('h2');
    cityElement.classList.add("card-header");
    cityElement.textContent=citySearched;
    containerElement.append(cityElement);
    getAPI();
    fiveDayForecast();
});

