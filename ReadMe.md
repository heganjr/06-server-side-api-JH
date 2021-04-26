# 06-Weather-Dashboard

by Jacob Hegan
UWA Full Flex Bootcamp February 2021

[GitHub Repository](https://github.com/heganjr/06-weather-dashboard-JH)

[GitHub Pages](https://heganjr.github.io/06-weather-dashboard-JH/)

## The Task

By searching a city name I am able to fetch weather information so that I can view the current weather information, along with a 5 day forecast.

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

---

As One Call API was only able to search for cities based on latitude and longitude. I used the Current Weather Data API to fetch the lat and lon information for a city search then used One Call Api to fetch the rest of the weather information.

There was difficulty getting local storage to work and append buttons to the page. Currently upon a search a button is appended allowing the user to click the button and search again (without having to type in the input field)

A maximum of 10 buttons are appended before the first button is shifted (.shift) to allow for a new entry.

Currently there is no styling on the page, but the functionality works. I plan to add styling shortly.

## Screenshots

Current deployment (before styling)

![screen-shot](./assets/images/screenshot.png)