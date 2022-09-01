// Current date

function getDateTime(date) {
  let weekDay = date.getDay();
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${weekDays[weekDay]} ${hour}:${minutes}`;
}

function getMonthYear(date) {
  let month = date.getMonth();
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
  let day = date.getDate();
  let year = date.getFullYear();

  return `${months[month]} ${day}, ${year}`;
}
let curranteDate = new Date();
let dateTime = document.querySelector("#current-weekday-time");
dateTime.innerHTML = getDateTime(curranteDate);

let monthYear = document.querySelector("#current-month-year");
monthYear.innerHTML = getMonthYear(curranteDate);

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
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

// Bonus point
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

updateInfo("Kiev");
