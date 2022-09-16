// Preloader
let mask = document.querySelector("#mask");
function hideMask() {
  mask.classList.add("hide");
}

function showMask() {
  mask.classList.remove("hide");
}

//  Call Api
function getData(city) {
  showMask();
  const apiKey = "5dbca037f9f2d02bb53f691a0a9ec0f7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeContent);
}
getData("Kyiv");

function getForecastData(coordinates) {
  const apiKey = `a43564c91a6c605aeb564c9ed02e3858`;
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getDataForCurCity(position) {
  showMask();
  let curLat = position.coords.latitude;
  let curLon = position.coords.longitude;
  const apiKey = "5dbca037f9f2d02bb53f691a0a9ec0f7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${curLat}&lon=${curLon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeContent);
}

function changeContent(response) {
  const date = response.data.dt;
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
  getForecastData(response.data.coord);
}

function formatWeekDay(timestamp) {
  const day = new Date(timestamp * 1000).getDay();
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

function getDateTime(timestamp) {
  const date = new Date(timestamp * 1000);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${formatWeekDay(timestamp)} ${hour}:${minutes}`;
}

function getMonthYear(timestamp) {
  const date = new Date(timestamp * 1000);
  const month = date.getMonth();
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
  const day = date.getDate();
  const year = date.getFullYear();

  return `${months[month]} ${day}, ${year}`;
}

function eventHandler(e) {
  e.preventDefault();
  let city = document.querySelector("#search-input").value;
  e.target.reset();
  return getData(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", eventHandler);

function onButtonClickHandler() {
  navigator.geolocation.getCurrentPosition(getDataForCurCity);
}
let curButton = document.querySelector("#btn-current");
curButton.addEventListener("click", onButtonClickHandler);

// Forecast
function displayForecast(response) {
  const forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index >= 1 && index < 6) {
      forecastHTML += `
              <div class="col">
                <div class="card">
                  <img
                    class="weather-forecast-icon"
                    src="images/Weather_icons_NEW/${
                      forecastDay.weather[0].icon
                    }.svg"
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
                    <div class="weather-forcast-date">${formatDate(
                      forecastDay.dt
                    )}</div>
                </div>
              </div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
  hideMask();
}

function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  let day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  if (day < 10) {
    day = `0${day}`;
  }

  return `${month}/${day}/${year}`;
}


