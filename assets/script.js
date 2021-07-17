const ApiKey= "6845bd9653c312c4a4d4b0a988d5d986";
const searchButton= document.querySelector("button");
const containerElement= document.getElementById("currentSearch");
const listOfCitySearched= document.getElementById("listCitySearched");
containerElement.classList.add("card");
const fiveDayElement= document.getElementById("fiveDayForecast");
fiveDayElement.classList.add("container");
var today= moment().format("L");

function getAPI(){
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=41.8781&lon=-87.6298&appid=" + ApiKey + "&units=imperial")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)
        //Extracted the 5 variables I wanted to display for my current weather forecast
        var currentTemp = data.current.temp;
        var wind = data.current.wind_speed;
        var humidity = data.current.humidity;
        var uvIndex =data.current.uvi;
        //weather icon targetted but not getting the image.
        var weatherIcon =data.current.weather[0].icon;
        console.log(currentTemp, wind, humidity, uvIndex, weatherIcon);
        //taking the value of user input in search bar and creating an H2 to append it to
        var citySearched= document.getElementById("userCityChoice").value;
        var cityElement= document.createElement('h2');
        cityElement.classList.add("card-header"); //added card header to differentiate data from city
        //adding todays date to the city searched input
        cityElement.textContent=citySearched + today;

        //Temp being added to page
        var tempElement=document.createElement('h6');
        tempElement.textContent=`Temperature: ${currentTemp} °F`;
          //Wind being added to page
        var windElement=document.createElement('h6');
        windElement.textContent=`Wind Speed: ${wind} MPH`;
          //UV being added to page
        var UVElement=document.createElement('h6');
        UVElement.textContent=`UV Index: ${uvIndex}`;
          //Humidity being added to page
        var humidityElement= document.createElement('h6');
        humidityElement.textContent=`Humidty: ${humidity}%`;
        //appending all 5 variable to the div element w class card. 
        containerElement.append(cityElement, tempElement, windElement, UVElement, humidityElement);
        
        // Populating the 5 day forecast

        //targeted the 5 day forecast data,
    
        for (let i=0; i <data.daily.length; i++){
      console.log("this"+ data.daily[i])
        //created the cards by creating a div w card class
        var individualCardsForecast=document.createElement('div');
        individualCardsForecast.classList.add("card");
        //created another div to nest w class of card-body. parent tag has class of container, then another div w class of card 
        var cardbodies= document.createElement('div');
        cardbodies.classList.add("card-body")
        individualCardsForecast.appendChild(cardbodies)
        
        var cardTitle= document.createElement('h4');
        cardTitle.classList.add("card-title");
        cardTitle.textContent=today; //set text content to range of 5 days
        cardbodies.appendChild(cardTitle);
        
        let fiveDayForecastHumidity= data.daily[i].humidity;
        var humidityElement=document.createElement('p');
        humidityElement.textContent=`Humidity:${fiveDayForecastHumidity}%`;
        cardbodies.appendChild(humidityElement);
        
        let fiveDayForecastWind=data.daily[i].wind_speed;
        var windElement=document.createElement('p');
        windElement.textContent=`Wind Speed: ${fiveDayForecastWind} MPH`;
        cardbodies.appendChild(windElement);
        
        let fiveDayForecastTemp=data.daily[i].temp[0,"day"];
        var tempElement=document.createElement('p');
        tempElement.textContent=`Temperature: ${fiveDayForecastTemp}°F`;
        cardbodies.appendChild(tempElement);

        fiveDayElement.appendChild(individualCardsForecast);
        };
        
    })
};

searchButton.addEventListener("click", function(){
    console.log("clicked")
    getAPI();
    displayCity();
    // getCityConvertedToLongandLat();
} 
);

//display users city choices on screen as list items
//created a div w class of card, so the population of cities that user inputs looks good using bootstrap classes.
function displayCity (){
  listOfCitySearched.classList.add("card");
  var listItem = document.createElement('li');
  listItem.classList.add("list-group-item");
  var ulItem = document.createElement('ul');
  ulItem.classList.add("list-group");
  ulItem.append(listItem);
  listOfCitySearched.appendChild(ulItem)
  var citySearched= document.getElementById("userCityChoice").value;
  listItem.textContent=citySearched;
  listOfCitySearched.append(ulItem);
//setting local storage in this function 
  localStorage.setItem("searchedCity",citySearched)
};



// var citySearched= document.getElementById("citySearched").value;
// function getCityConvertedToLongandLat(){
//   fetch("https://api.openweathermap.org/data/2.5/weather?q=" + citySearched + "&appid=" + ApiKey)
//   .then(function(response){
//     // console.log(response);
//     return response.json();
// })
//  .then(function(data){
//   console.log(data)

// })
// };