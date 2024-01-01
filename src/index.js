function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchInputElement.value;
  let city = searchInputElement.value;

  let apiKey = "b84b065do096ab8b5a39fb9t38e99a64";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateElement.innerHTML = formatDate(currentDate);

function displayTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  let tempElement = document.querySelector("#current-temp");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");

  tempElement.innerHTML = `${temperature}`;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windSpeedElement.innerHTML = response.data.wind.speed;

  iconElement.innerHTML = `<img class="current-temperature-icon" src="${response.data.condition.icon_url}" />`;

  getForecast(response.data.city);
}
function getForecast(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml += `
      <div class="weather-forecast-day">
      <div class="forecast">
       <img src="${day.condition.icon_url}" class="weather-forecast-icon" /> 
      <div class="weather-forecast-date">${formatDay(day.time)}</div>
        
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(
              day.temperature.maximum
            )}º</strong> / ${Math.round(day.temperature.minimum)}º
          </div>
        </div>
        </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
