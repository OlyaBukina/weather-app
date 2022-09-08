// Current date

function getDateTime(date) {
  let weekDay = new Date(date).getDay();
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let hour = new Date(date).getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = new Date(date).getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${weekDays[weekDay]} ${hour}:${minutes}`;
}

function getMonthYear(date) {
  let month = new Date(date).getMonth();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let day = new Date(date).getDate();
  let year = new Date(date).getFullYear();

  return `${months[month]} ${day}, ${year}`;
}

// City name
function eventHandler(e) {
  e.preventDefault();
  let city = document.querySelector("#search-input").value;
  e.target.reset();
  return updateInfo(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", eventHandler);

// Weather API

function updateInfo(city) {
  const apiKey = "5dbca037f9f2d02bb53f691a0a9ec0f7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeContent);
}
function changeContent(response) {
  let date = response.data.dt * 1000;
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-weekday-time").innerHTML = getDateTime(date);
  document.querySelector("#current-month-year").innerHTML = getMonthYear(date);

  celsiusTemperature = response.data.main.temp;

  document.querySelector("#current-temp").innerHTML =
    Math.round(celsiusTemperature);
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `images/Weather_icons_NEW/${response.data.weather[0].icon}.svg`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", `${response.data.weather[0].description} icon`);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  getForecast(response.data.coord);
}

// Current city
function onButtonClickHandler() {
  navigator.geolocation.getCurrentPosition(resetToCurPosition);
}
function resetToCurPosition(position) {
  let curLat = position.coords.latitude;
  let curLon = position.coords.longitude;
  const apiKey = "5dbca037f9f2d02bb53f691a0a9ec0f7";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${curLat}&lon=${curLon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(changeContent);
}

let curButton = document.querySelector("#btn-current");
curButton.addEventListener("click", onButtonClickHandler);

updateInfo("Kyiv");

// Cards in the footer
function formatWeekDay(timestamp) {
  let day = new Date(timestamp * 1000).getDay();
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekDays[day];
}

function formatData(timestamp) {
  let day = new Date(timestamp * 1000).getDate();
  let month = new Date(timestamp * 1000).getMonth();
  let year = new Date(timestamp * 1000).getFullYear();

  if (day < 10) {
    day = `0${day}`;
  }

  return `${month}/${day}/${year}`;
}
function displeyForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row row-cols-2 row-cols-lg-5 g-2 g-md-4 text-center">`;

  forecast.forEach(function (forecastDay, index) {
    if (index >= 1 && index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
        <div class="card">
          <img
            class="weather-forecast-icon"
            src="images/Weather_icons_NEW/${forecastDay.weather[0].icon}.svg"
            alt="${forecastDay.weather[0].description}"
            />
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max">${Math.round(
                forecastDay.temp.max
              )}°</span>
              <span class="weather-forecast-temperature-min">${Math.round(
                forecastDay.temp.min
              )}°</span>
            </div>
            <div class="weather-forcast-day">${formatWeekDay(
              forecastDay.dt
            )}</div>
            <div class="weather-forcast-date">${formatData(
              forecastDay.dt
            )}</div>
        </div>
      </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = `a43564c91a6c605aeb564c9ed02e3858`;
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displeyForecast);
}
