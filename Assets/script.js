const searchButton = document.getElementById("search-city");

const inputField = document.getElementById("search-field");

const savedCitiesDiv = document.getElementById("saved-cities");

searchButton.addEventListener("click", clickEventFunction);

inputField.addEventListener("keyup", function (event) {
  if (event.code === "Enter" || event.code === "NumpadEnter") {
    clickEventFunction();
  }
});

savedCitiesDiv.addEventListener("click", buttonClickEvent);

function buttonClickEvent(event) {
  console.log(event);
  let buttonValue = event.target.outerText;
  fetchWeatherData(buttonValue);
}
// The value of the even goes to fetch

// let citySave = [];
// WE NEED TO CREATE THE LOCAL STORAGE

function renderCityButtons() {
  let citySave = getLocalStorage();
  $("#saved-cities").html("");
  //   if this div has any children I am putting them up for adoption

  if (citySave) {
    // Does citySave exist?
    // same as CitySave = does not equal null
    for (let i = 0; i < citySave.length; i++) {
      const city = citySave[i];
      const liElement = document.createElement("li");
      liElement.setAttribute("class", "list-group-item");
      const cityButtonElement = document.createElement("button");
      $(liElement).append(cityButtonElement);
      $("#saved-cities").append(liElement);
      // Putting button inside the list elements and then appending the list elements to unordered list
      cityButtonElement.setAttribute("id", city);
      cityButtonElement.textContent = city;
      // Creating button element
      // For loop for every value in local storage array
      // creating id based on the city name in array
      // appending text to the button based on name of array object
    }
  }
}

renderCityButtons();

function getLocalStorage() {
  let citySave = localStorage.getItem("cities");
  citySave = JSON.parse(citySave);
  return citySave;
  // Tidying up code with functions
}

function clickEventFunction() {
  let inputValue = inputField.value;
  fetchWeatherData(inputValue);
}
function fetchWeatherData(inputValue) {
  console.log(inputValue);
  const currentWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=f4c1ad1284caf81039b2d3d58112a7dc&units=metric`;
  // get the city name in input - temperal literal
  fetch(currentWeatherAPI)
    .then(function (currentWeatherResponse) {
      return currentWeatherResponse.json();
      // return = stop process or with info hands off the info to another function
      // json = makes it understand for JS to read
      // fetch currentWeatherAPI
      // .then = waiting for the info (i.e Fetch)
    })
    .then(function (latLonData) {
      // latLongData is the data of the json format as .then is next in the process and latLonData is declared
      let latitude = latLonData.coord.lat;
      let longitude = latLonData.coord.lon;
      console.log(latitude);
      console.log(longitude);
      let cityName = latLonData.name;
      citySave = getLocalStorage();
      if (citySave === null) {
        citySave = [];
      }

      if (citySave.length === 10) {
        citySave.shift();
        //   shift always grabs first array [0]
        //   pop grabs last in the array
      }

      if (citySave.includes(cityName) === false) {
        // if city save does not include cityName
        citySave.push(cityName);
        // pushing cityName to Cities array
        citiesString = JSON.stringify(citySave);
        // converting the array to a string = stringify
        localStorage.setItem("cities", citiesString);
        // setting local storage for the cities
      }

      renderCityButtons();
      // Adding city name to the current day h1 title
      console.log(cityName);
      $("#selected-city").html(
        `${cityName} - <span id="current-date">[CURRENT DATE HERE]</span>`
      );
      // .text didnt work because it elimated the whole line in the h3 of selected city
      // so we used innerHTML (html for JQuery) - so html removes elements as well as text
      latLongWeatherData(latitude, longitude);
      // parameters are used to bring variable data from this function down to latLongWeatherData - positioning is important as it represents the placeholders in the following function bbased on it's positioning.
    });
}
let cityName;

let degreeCelcius = `\u2103`;
// unicode character with codepoint

function latLongWeatherData(lat, lon) {
  const oneCallApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=f4c1ad1284caf81039b2d3d58112a7dc&units=metric`;
  // One Call Api concatinate lat and long from previous fetch call placeholders are used to let function know where to place data.
  fetch(oneCallApi)
    .then(function (oneCallResponse) {
      console.log(oneCallResponse);
      return oneCallResponse.json();
      // return passes the baton to the next .then
    })
    .then(function (allTheWeatherData) {
      console.log(allTheWeatherData);
      let unixTimestampDate = new Date(
        allTheWeatherData.current.dt * 1000
      ).toLocaleDateString("en-GB");
      console.log(unixTimestampDate);
      let currentWeatherIconPull = allTheWeatherData.current.weather[0].icon;
      $("#current-day #current-date").text(unixTimestampDate);
      // see unixTimestamp stack overflow - https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
      // Appending unix time conversion to the id current day child current date

      let currentWeatherIcon = `http://openweathermap.org/img/wn/${currentWeatherIconPull}.png`;
      console.log(currentWeatherIcon);
      $("#current-day .weather-icon").attr("src", currentWeatherIcon);
      // creating a source attribute to the image to get the text by manipulating the link with the icon link with temproal literal

      let currentTemp = allTheWeatherData.current.temp;
      $("#current-day .temp").text(`${currentTemp}${degreeCelcius}`);
      console.log(allTheWeatherData);

      let currentWind = allTheWeatherData.current.wind_speed;
      // converting metres per sec to kph
      $("#current-day .wind").text(`${currentWind} m/s`);

      let currentHumidity = allTheWeatherData.current.humidity;
      $("#current-day .humidity").text(`${currentHumidity}%`);

      let currentUV = allTheWeatherData.current.uvi;
      $("#UV").text(`${currentUV}`);

      if (currentUV >= 0 && currentUV <= 2.99) {
        $("#uv-text").css("backgroundColor", "green");
      }

      if (currentUV >= 3 && currentUV <= 5.99) {
        $("#uv-text").css("backgroundColor", "yellow");
      }

      if (currentUV >= 6 && currentUV <= 7.99) {
        $("#uv-text").css("backgroundColor", "orange");
      }

      if (currentUV >= 8 && currentUV <= 10.99) {
        $("#uv-text").css("backgroundColor", "red");
      }

      if (currentUV >= 11) {
        $("#uv-text").css("backgroundColor", "purple");
      }
      // UV Colour based on value

      for (let i = 1; i < 6; i++) {
        let fiveDayTemp = allTheWeatherData.daily[i].temp.day;
        $(`#temp${[i]}`).text(`${fiveDayTemp}${degreeCelcius}`);

        let fiveDayWind = allTheWeatherData.daily[i].wind_speed;
        $(`#wind${[i]}`).text(`${fiveDayWind} m/s`);

        let fiveDayHumidity = allTheWeatherData.daily[i].humidity;
        $(`#humidity${[i]}`).text(`${fiveDayHumidity}%`);

        let fiveDayWeatherIcon = allTheWeatherData.daily[i].weather[0].icon;
        $(`#weather-icon${[i]}`).attr(
          `src`,
          `http://openweathermap.org/img/wn/${fiveDayWeatherIcon}.png`
        );

        let unixTimestampDate = new Date(
          allTheWeatherData.daily[i].dt * 1000
        ).toLocaleDateString("en-GB");
        $(`#date${i}`).text(unixTimestampDate);
      }

      // next step - append data to html elements
      // if no
      // .textcontent just adding text
      // innerhtml can manipulate the html elements i.e add or remove element
    });
}
// placeholder = HEY, I want to give you information this is where you will place it
// can decalre as many functions as possible with a comma to split

// async function fetchCall (latLongWeatherData){}
