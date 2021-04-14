
const searchButton = document.getElementById('search-city')
console.log(searchButton)

const inputField = document.getElementById("search-field")
console.log(inputField)

searchButton.addEventListener('click', fetchWeatherData)


function fetchWeatherData(){
    let inputValue = inputField.value
    console.log(inputField)
    const currentWeatherAPI = 'http://api.openweathermap.org/data/2.5/weather?q=' + inputValue + '&appid=f4c1ad1284caf81039b2d3d58112a7dc&units=metric'
    // get the city name in input
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
        latLongWeatherData(latitude, longitude)
        // parameters are used to bring variable data from this function down to latLongWeatherData - positioning is important as it represents the placeholders in the following function bbased on it's positioning.

    

    })

}

let cityName;




function latLongWeatherData(lat, lon){
    const oneCallApi = 'http://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon +'&exclude=minutely,hourly&appid=f4c1ad1284caf81039b2d3d58112a7dc&units=metric'
    // One Call Api concatinate lat and long from previous fetch call placeholders are used to let function know where to place data.
    fetch(oneCallApi).then(function (oneCallResponse){
        console.log(oneCallResponse)
        return oneCallResponse.json()
        // return passes the baton to the next .then
    })
    .then(function (allTheWeatherData){
        console.log(allTheWeatherData)
        // next step - append data to html elements
        // if no
        // .textcontent just adding text
        // innerhtml can manipulate the html elements i.e add or remove element
        let temp =
        let
    })


}
// placeholder = HEY, I want to give you information this is where you will place it
// can decalre as many functions as possible with a comma to split

// async function fetchCall (latLongWeatherData){}