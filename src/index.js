//Date
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  let currentHours = date.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  return `${currentDay} ${currentHours}:${currentMinutes}`;
}

let now = new Date();
let currentDayTime = document.querySelector("#date");
currentDayTime.innerHTML = formatDate(now);

//Searching a city
function searchCity(city) {
  let apiKey = "227c2b4793ca0c16e450b597ecdebe79";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

//Display details of weather
function displayWeather(response) {
  //Show current cuty
  document.querySelector("#currentCity").innerHTML = response.data.name;
  //Show current temperature
  document.querySelector("#current_temp").innerHTML = Math.round(
    response.data.main.temp
  );
  //Show Humidity
  document.querySelector("#current_humidity").innerHTML =
    response.data.main.humidity;
  //Show wind
  document.querySelector("#current_wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  //Show description
  document.querySelector("#current_description").innerHTML =
    response.data.weather[0].description; //main
  //Show icon
  let iconCurrent = document.querySelector("#icon");
  iconCurrent.setAttribute(
    "src",
    `images/icon/${response.data.weather[0].icon}.svg`
    // `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconCurrent.setAttribute("alt", response.data.weather[0].description);
}

///Geolocation
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "227c2b4793ca0c16e450b597ecdebe79";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayWeather);
}

let formSearching = document.querySelector("#search-form");
formSearching.addEventListener("submit", searchCity);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-btn");
currentLocationButton.addEventListener("click", getCurrentLocation);

// searchCity("London");
navigator.geolocation.getCurrentPosition(searchLocation);
