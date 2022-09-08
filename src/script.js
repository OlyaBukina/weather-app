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
// let curranteDate = new Date();
// let dateTime = document.querySelector("#current-weekday-time");
// dateTime.innerHTML = getDateTime(curranteDate);

// let monthYear = document.querySelector("#current-month-year");
// monthYear.innerHTML = getMonthYear(curranteDate);

// City name
function eventHandler(e) {
  e.preventDefault();
  let city = document.querySelector("#search-input").value;
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
  console.log(response);
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
  console.log(response.data.weather[0].icon);
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

let celsiusTemperature = null;

function displayFahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrTemp = Math.round((celsiusTemperature * 9) / 5 + 32);
  document.querySelector("#current-temp").innerHTML = fahrTemp;
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

function displaycelsiusTemp(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  document.querySelector("#current-temp").innerHTML =
    Math.round(celsiusTemperature);
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displaycelsiusTemp);

updateInfo("Kyiv");

function displeyForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row row-cols-2 row-cols-lg-5 g-2 g-md-4 text-center">`;
  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  weekDays.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col">
        <div class="card">
          <img
            class="weather-forecast-icon"
            src="images/Weather_icons_NEW/03d.svg"
            alt="clouds"
            />
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max">24°</span>
              <span class="weather-forecast-temperature-min">20°</span>
            </div>
            <div class="weather-forcast-day">${day}</div>
            <div class="weather-forcast-date">08/11/2022</div>
        </div>
      </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
displeyForecast();
