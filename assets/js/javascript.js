var cityLocation = document.getElementById('city');
var cityTemp = document.getElementById('temperature');
var cityWind = document.getElementById('windSpeed');
var cityHumidity = document.getElementById('humidity');
var cityUV = document.getElementById('uvIndex');

var currentCity = function(location) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=9f2a573047350fc85e320b551e5f6ee3&units=metric"

    fetch(apiUrl)
    .then(function(response) {
        if(response.ok) {
            response.json().then(function (data) {
                //console.log(data);
                //console.log(data.name);
                //console.log(data.main.temp);
                var lat = data.coord.lat;
                var lon = data.coord.lon;
                currentTemp(lat, lon);
            })
        }
    });
}

var currentTemp = function(lat, lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=9f2a573047350fc85e320b551e5f6ee3&units=metric"

    fetch(apiUrl)
    .then(function(response) {
        if(response.ok) {
            response.json().then(function (data) {
                console.log(data);
                weatherDisp(data);
            })
        }
    });
}

var fiveDayforecast = function(location) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + location + "&cnt=5&appid=89db6ee33f965f17179f43e66f935569&units=metric"

    fetch(apiUrl)
    .then(function(response) {
        if(response.ok) {
            response.json().then(function (data) {
                console.log(data);
            })
        }
    });
}

var forecastCall = function(location) {
    currentCity(location);
    //fiveDayforecast(location);
}

var weatherDisp = function(info) {
    var date = moment().format("M/D/YYYY")
    var cityName = info.timezone.split("/")[1];
    var iconE1 = document.createElement("img");
    
    //get current weather icon from API response
    iconE1.setAttribute("src", weatherIcon = "http://openweathermap.org/img/wn/" + info.current.weather[0].icon + ".png");
    cityLocation.textContent = cityName + " (" + date + ") ";
    cityLocation.appendChild(iconE1);
    
    //set Temperature, Wind, and Humidity for chosen city
    cityTemp.textContent = "Temp: " + info.current.temp + "°C";
    cityWind.textContent = "Wind: " + info.current.wind_speed + " km/h";
    cityHumidity.textContent = "Humidity: " + info.current.humidity + " %";

    //change UV rating background based on value
    var uvRating = info.current.uvi;
    cityUV.textContent = "UV Index: ";
    cityUV.appendChild(uvRating);
}

forecastCall("Toronto");