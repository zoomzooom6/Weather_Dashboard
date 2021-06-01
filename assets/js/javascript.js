var cityLocation = document.getElementById('city');
var cityTemp = document.getElementById('temperature');
var cityWind = document.getElementById('windSpeed');
var cityHumidity = document.getElementById('humidity');
var cityUV = document.getElementById('uvIndex');

//create variables for each subsequent day
var oneDate = document.getElementById('foreOne');
var oneTemp = document.getElementById('tempForeOne');
var oneWind = document.getElementById('windForeOne');
var oneHum = document.getElementById('humForeOne');

var twoDate = document.getElementById('foreTwo');
var twoTemp = document.getElementById('tempForeTwo');
var twoWind = document.getElementById('windForeTwo');
var twoHum = document.getElementById('humForeTwo');

var threeDate = document.getElementById('foreThree');
var threeTemp = document.getElementById('tempForeThree');
var threeWind = document.getElementById('windForeThree');
var threeHum = document.getElementById('humForeThree');

var fourDate = document.getElementById('foreFour');
var fourTemp = document.getElementById('tempForeFour');
var fourWind = document.getElementById('windForeFour');
var fourHum = document.getElementById('humForeFour');

var fiveDate = document.getElementById('foreFive');
var fiveTemp = document.getElementById('tempForeFive');
var fiveWind = document.getElementById('windForeFive');
var fiveHum = document.getElementById('humForeFive');

var currentCity = function(location) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=9f2a573047350fc85e320b551e5f6ee3&units=metric"

    fetch(apiUrl)
    .then(function(response) {
        if(response.ok) {
            response.json().then(function (data) {
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
    setDate();
    setFutureTemp(location);
    setFutureWind(location);
    setFutureHumidity(location);
}

var forecastCall = function(location) {
    currentCity(location);
}

var weatherDisp = function(info) {
    var date = moment().format("M/D/YYYY")
    var cityName = info.timezone.split("/")[1];
    var iconE1 = document.createElement('img');
    iconE1.classList = "icon";
    
    //get current weather icon from API response
    iconE1.setAttribute("src", weatherIcon = "http://openweathermap.org/img/wn/" + info.current.weather[0].icon + ".png");
    cityLocation.textContent = cityName + " (" + date + ") ";
    cityLocation.appendChild(iconE1);
    
    //set Temperature, Wind, Humidity, and UV for chosen city
    cityTemp.textContent = "Temp: " + info.current.temp + "°C";
    cityWind.textContent = "Wind: " + info.current.wind_speed + " km/h";
    cityHumidity.textContent = "Humidity: " + info.current.humidity + " %";
    var uvRating = document.createElement('p');
    //uvRating.classList = "rating";
    uvRating.innerHTML = info.current.uvi;

    //change UV rating background based on value
    if(info.current.uvi < 2) {
        uvRating.classList = "rating uvLow";
    } else if (info.current.uvi < 5) {
        uvRating.classList = "rating uvMod";
    } else {
        uvRating.classList = "rating uvHigh";
    }
    cityUV.textContent = "UV Index: ";
    cityUV.appendChild(uvRating);

    //get 5 day forecast
    fiveDayforecast(info);
}

//function to label next 5 days
var setDate = function() {
    oneDate.textContent = moment().add(1, 'd').format("M/D/YYYY");
    twoDate.textContent = moment().add(2, 'd').format("M/D/YYYY");
    threeDate.textContent = moment().add(3, 'd').format("M/D/YYYY");
    fourDate.textContent = moment().add(4, 'd').format("M/D/YYYY");
    fiveDate.textContent = moment().add(5, 'd').format("M/D/YYYY");
}

//function to show 5 day temperature forecast and icons
var setFutureTemp = function(temp) {

}

//function to show 5 day wind forecast
var setFutureWind = function(wind) {

}

//function to show 5 day humidity forecast
var setFutureHumidity = function(humidity) {

}

forecastCall("Toronto");