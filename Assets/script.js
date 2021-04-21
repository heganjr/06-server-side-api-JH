
const searchButton = document.getElementById('search-city')
console.log(searchButton)

const inputField = document.getElementById("search-field")
console.log(inputField)

searchButton.addEventListener('click', fetchWeatherData)
// searchButton.addEventListener('keyup', function(event) {
//     if (event.keyCode === 13) {
//         searchButton.click()
        
//     }
// })
// Tried to use enter button to search



function fetchWeatherData(){
    let inputValue = inputField.value
    console.log(inputField)
    const currentWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=f4c1ad1284caf81039b2d3d58112a7dc&units=metric`
    // get the city name in input - temperal literal
    fetch(currentWeatherAPI).then(function (currentWeatherResponse){
        return currentWeatherResponse.json()
        // return = stop process or with info hands off the info to another function
        // json = makes it understand for JS to read
        // fetch currentWeatherAPI
        // .then = waiting for the info (i.e Fetch)

    })
    .then(function (latLonData){
        // latLongData is the data of the json format as .then is next in the process and latLonData is declared
        let latitude = latLonData.coord.lat;
        let longitude = latLonData.coord.lon
        console.log(latitude)
        console.log(longitude)
        let cityName = latLonData.name
        // Adding city name to the current day h1 title
        console.log(cityName)
        $("#selected-city").html(`${cityName} - <span id="current-date">[CURRENT DATE HERE]</span>`);
        // .text didnt work because it elimated the whole line in the h3 of selected city
        // so we used innerHTML (html for JQuery) - so html removes elements as well as text
        latLongWeatherData(latitude, longitude)
        // parameters are used to bring variable data from this function down to latLongWeatherData - positioning is important as it represents the placeholders in the following function bbased on it's positioning.

    

    })

}

let cityName;



let degreeCelcius = `\u2103`
// unicode character with codepoint

console.log(degreeCelcius)
function latLongWeatherData(lat, lon){
    const oneCallApi = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon +'&exclude=minutely,hourly&appid=f4c1ad1284caf81039b2d3d58112a7dc&units=metric'
    // One Call Api concatinate lat and long from previous fetch call placeholders are used to let function know where to place data.
    fetch(oneCallApi).then(function (oneCallResponse){
        console.log(oneCallResponse)
        return oneCallResponse.json()
        // return passes the baton to the next .then
    })
    .then(function (allTheWeatherData){
        console.log(allTheWeatherData)
        let unixTimestampDate = new Date(allTheWeatherData.current.dt * 1000).toLocaleDateString("en-GB")
        console.log(unixTimestampDate)
        let currentWeatherIconPull = allTheWeatherData.current.weather[0].icon
        $("#current-day #current-date").text(unixTimestampDate);
        // see unixTimestamp stack overflow - https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
        // Appending unix time conversion to the id current day child current date


        let currentWeatherIcon = `http://openweathermap.org/img/wn/${currentWeatherIconPull}.png`
        console.log(currentWeatherIcon)
        $("#current-day .weather-icon").attr("src", currentWeatherIcon);
        // creating a source attribute to the image to get the text by manipulating the link with the icon link with temproal literal

        let currentTemp = allTheWeatherData.current.temp
        $("#current-day .temp").text(`${currentTemp}${degreeCelcius}`);

        let currentWind = allTheWeatherData.current.wind_speed * 3.6
        console.log(currentWind)
        // converting metres per sec to kph
        $("#current-day .wind").text(`${currentWind} KPH`);

        let currentHumidity = allTheWeatherData.current.humidity
        $("#current-day .humidity").text(`${currentHumidity}%`);

        let currentUV = allTheWeatherData.current.uvi
        $("#UV").text(`${currentUV}`);

        for (let i = 0; i < 5; i++) {
            let fiveDayTemp = allTheWeatherData.daily[i].temp.day
            $(`#temp${[i]}`).text(`${fiveDayTemp}${degreeCelcius}`);

            let fiveDayWind = (allTheWeatherData.daily[i].wind_speed) * 3.6
            console.log(fiveDayWind)
            $(`#wind${[i]}`).text(`${fiveDayWind} KPH`);

            let fiveDayHumidity = allTheWeatherData.daily[i].humidity
            console.log(fiveDayHumidity)
            $(`#humidity${[i]}`).text(`${fiveDayHumidity}%`);

            let fiveDayWeatherIcon = allTheWeatherData.daily[i].weather[0].icon
            console.log(fiveDayWeatherIcon)
            $(`#weather-icon${[i]}`).attr(`src`, `http://openweathermap.org/img/wn/${fiveDayWeatherIcon}.png`);
        }

        



        // next step - append data to html elements
        // if no
        // .textcontent just adding text
        // innerhtml can manipulate the html elements i.e add or remove element
        
    })


}
// placeholder = HEY, I want to give you information this is where you will place it
// can decalre as many functions as possible with a comma to split

// async function fetchCall (latLongWeatherData){}