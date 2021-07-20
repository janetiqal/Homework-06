const ApiKey = "6845bd9653c312c4a4d4b0a988d5d986";
const searchButton = document.getElementById("submitbtn");
const containerElement = document.getElementById("currentSearch");
const listOfCitySearched = document.getElementById("listCitySearched");
const fiveDayElement = document.getElementById("fiveDayForecast");

searchButton.addEventListener("click", function (event) {
citySearched=document.getElementById("userCityChoice").value;

  if (event && citySearched===""){
    alert("Enter a Valid City")
  } else{
  event.preventDefault();
  console.log("clicked")
  getAPI();
  displayCity();
}}
);

function getAPI(citySearched) {
  // the function runs w our w out parameters bc of this if/else
  //if we are not using a parameter, citySearched will show as undefined, and when its undefined, we use the search bar value.
  if (!citySearched){
    citySearched=document.getElementById("userCityChoice").value;
  }else{
    citySearched;
  }
  fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + citySearched
    + "&appid=" + ApiKey)
    .then(function (response) {
      return response.json();
    })
    .then(function (dataCoordinates) {
      longitude = dataCoordinates[0].lon;
      latitude = dataCoordinates[0].lat;
      console.log(longitude)
      console.log(latitude)

      fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + ApiKey + "&units=imperial")
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          //clearing the previous search before a new search begins/new data is populated
          document.getElementById("fiveDayForecast").innerHTML="";
          document.getElementById("currentSearch").innerHTML="";
        
          console.log(data)
          //Extracted the 6 variables I wanted to display for my current weather forecast
          var currentTemp = data.current.temp;
          var wind = data.current.wind_speed;
          var humidity = data.current.humidity;
          var uvIndex = data.current.uvi;
          var currentDate = data.current.dt;

          //weather icon targetted but not getting the image.
          var weatherIcon = data.current.weather[0].icon ;
          var weatherpicture= document.createElement("img");
          weatherpicture.src=("http://openweathermap.org/img/w/" +weatherIcon + ".png")
        
          console.log(currentTemp, wind, humidity, uvIndex, weatherIcon);
          //taking the value of user input in search bar and creating an H2 to append it to
          var citySearched = document.getElementById("userCityChoice").value;
          var cityElement = document.createElement('h2');
          cityElement.classList.add("card-header"); //added card header to differentiate data from city
          //adding todays date to the city searched input
          cityElement.textContent = citySearched + moment.unix(currentDate).format("MM/DD/YYYY");
          cityElement.append(weatherpicture)
          //Temp being added to page
          var tempElement = document.createElement('h6');
          tempElement.textContent = `Temperature: ${currentTemp} °F`;
          //Wind being added to page
          var windElement = document.createElement('h6');
          windElement.textContent = `Wind Speed: ${wind} MPH`;
          //UV being added to page
          var UVElement = document.createElement('h6');
          UVElement.textContent = `UV Index: ${uvIndex}`;
          if (uvIndex<3){
            UVElement.style.color="success";
          } else if(uvIndex>=3 && uvIndex <6){
            UVElement.style.color="warning"
          } else if(uvIndex>=6 && uvIndex <8){
            UVElement.style.color="orange";
          } else if(uvIndex>=8 && uvIndex <11){
            UVElement.style.color="danger";
          }else {
            UVElement.style.color="purple";
          };
         

          //Humidity being added to page
          var humidityElement = document.createElement('h6');
          humidityElement.textContent = `Humidty: ${humidity}%`;
          //appending all 5 variable to the div element w class card. 
          containerElement.classList.add("card");
          containerElement.classList.add("col-sm-9");

          containerElement.append(cityElement, tempElement, windElement, UVElement, humidityElement);

          // Populating the 5 day forecast
          //Used the same API to populate the 5 day forecast, this API gives us 7 so I modified the for loop to start at tomorrows date (array position 1) and end at 5 days from today. 
          for (let i = 1; i < 6; i++) {
            // created the cards div to set the size 
            var individualCardsForecast = document.createElement('div');
            individualCardsForecast.classList.add("col-md-2");
            
            //created the cards by creating a div w card class
            var sizeofIndividualCards = document.createElement('div');
            sizeofIndividualCards.classList.add("card");
            individualCardsForecast.appendChild(sizeofIndividualCards);
            
            //created another div to nest w class of card-body. parent tag has class of container, then another div w class of card 
            var cardbodies = document.createElement('div');
            cardbodies.classList.add("card-body")
            sizeofIndividualCards.appendChild(cardbodies)

            let dateTime = data.daily[i].dt;
            var cardTitle = document.createElement('h5');
            cardTitle.classList.add("card-title");
            cardTitle.textContent = moment.unix(dateTime).format("MM/DD/YYYY");
            cardbodies.appendChild(cardTitle);

            let weatherIcon = data.daily[i].weather[0].icon ;
            var weatherpicture= document.createElement("img");
            weatherpicture.src=("http://openweathermap.org/img/w/" + weatherIcon + ".png")
            cardTitle.append(weatherpicture)

            let fiveDayForecastHumidity = data.daily[i].humidity;
            var humidityElement = document.createElement('p');
            humidityElement.classList.add("card-text");
            humidityElement.textContent = `Humidity:${fiveDayForecastHumidity}%`;
            cardbodies.appendChild(humidityElement);

            let fiveDayForecastWind = data.daily[i].wind_speed;
            var windElement = document.createElement('p');
            windElement.classList.add("card-text");
            windElement.textContent = `Wind Speed: ${fiveDayForecastWind} MPH`;
            cardbodies.appendChild(windElement);

            let fiveDayForecastTemp = data.daily[i].temp[0, "day"];
            var tempElement = document.createElement('p');
            tempElement.classList.add("card-text");
            tempElement.textContent = `Temperature: ${fiveDayForecastTemp}°F`;
            cardbodies.appendChild(tempElement);

            fiveDayElement.appendChild(individualCardsForecast);
             document.querySelector("input").value="";

          };
        })
    })
};

//display users city choices on screen as list items
//created a div w class of card, so the population of cities that user inputs looks good using bootstrap classes.
function displayCity() {
  listOfCitySearched.classList.add("card");
  var citySearched = document.getElementById("userCityChoice").value; 
//created an array to hold the values of city input, add the OR statement because if there isnt anything in the array it returns undefined & wont work so I added an empty array for the cities to be  pushed into
  cityArray=JSON.parse(localStorage.getItem("searchedCity"))|| [] ;
  if (citySearched===""){
    cityArray.pop(citySearched);
  }else {
  cityArray.push(citySearched);
};
//setting the array tolocal storage to save it
  localStorage.setItem("searchedCity", JSON.stringify(cityArray));
  //for each item in the city Array (from local storage), I am creating elements and appending it to an existing parent div from the html page, which was declared at the top of the file page
  cityArray.forEach(function(cityName){
    var listItem = document.createElement('a');
    listItem.classList.add("list-group-item");
    listItem.classList.add("btn");

    var ulItem = document.createElement('ul');
    ulItem.classList.add("list-group");
    ulItem.append(listItem);
    // var citySearched = document.getElementById("userCityChoice").value;

    listItem.textContent = cityName;
    listItem.value = cityName;

    listOfCitySearched.append(ulItem);

    listItem.addEventListener("click", function(event){
      console.log("clicked search history")
      var citypicked= event.target.value;
      // var cityEl = document.createElement('h2');
      // cityEl.textContent= citypicked;
      // containerElement.append(citypicked)
      console.log(citypicked);
      let citySearched = citypicked;
      getAPI(citySearched);
    })
  });
 
};

// To DO LIST:
  //add the cities name to the h2 from the search history.
//loop over your localstorage array and see if the city is in there, if not,  need to push the city into the array, if it is there is no need to push into the array
// add response.status >= 400, error make sure city input is valid