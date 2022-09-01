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
function getCityName() {
  let searchInput = document.querySelector("#search-input");
  return searchInput.value;
}

function changeCityName() {
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = getCityName();
}

function eventHandler(e) {
  e.preventDefault();
  changeCityName();
  updateInfo();
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", eventHandler);

// Weather API
const apiKey = "5dbca037f9f2d02bb53f691a0a9ec0f7";

function updateInfo() {
  let searchInput = document.querySelector("#current-city");
  let city = searchInput.innerHTML;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  function responseHandler(response) {
    changeContent(response);
  }
  axios.get(apiUrl).then(responseHandler);
}
function changeContent(response) {
  changeCurTemp(response);
  changeHumidity(response);
  changeWind(response);
  changeDescription(response);
}

function changeCurTemp(response) {
  let curTemp = Math.round(response.data.main.temp);
  let h2 = document.querySelector("#current-temp");
  h2.innerHTML = curTemp;
}

function changeHumidity(response) {
  let curHim = response.data.main.humidity;
  let title = document.querySelector("#humidity");
  title.innerHTML = curHim;
}

function changeWind(response) {
  let curWind = Math.round(response.data.wind.speed);
  let title = document.querySelector("#wind");
  title.innerHTML = curWind;
}

function changeDescription(response) {
  let curDescr = response.data.weather[0].main;
  let title = document.querySelector("#description");
  title.innerHTML = curDescr;
}
// Bonus point
function onButtonClickHandler() {
  navigator.geolocation.getCurrentPosition(resetToCurPosition);
}
function resetToCurPosition(position) {
  let curLat = position.coords.latitude;
  let curLon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${curLat}&lon=${curLon}&appid=${apiKey}&units=metric`;

  function responseHandler(response) {
    changeCurCity(response);
    changeContent(response);
  }
  axios.get(apiUrl).then(responseHandler);
}

let curButton = document.querySelector("#btn-current");
curButton.addEventListener("click", onButtonClickHandler);

function changeCurCity(response) {
  let curCity = response.data.name;
  let title = document.querySelector("#current-city");
  title.innerHTML = curCity;
}
