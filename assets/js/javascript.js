var userFormE1 = document.getElementById('user-form');
var citySearch = document.getElementById('cityName');
var searchHist = document.getElementById('searchHistory');

//create variables for today's elements
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

var formSubmitHandler = function(event) {
    event.preventDefault();

    var searchCity = citySearch.value;

    if (searchCity) {
        currentCity(searchCity);
        citySearch.value = "";
    } 
};

var searchHistory = function(city) {
    var buttonE1 = document.createElement('button');
    buttonE1.classList = "btn padded";
    buttonE1.textContent = city;
    searchHist.appendChild(buttonE1);
};

var currentCity = function(location) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=9f2a573047350fc85e320b551e5f6ee3&units=metric"

    fetch(apiUrl)
    .then(function(response) {
        if(response.ok) {
            response.json().then(function (data) {
                var lat = data.coord.lat;
                var lon = data.coord.lon;
                currentTemp(lat, lon, data.name);
                searchHistory(location);
            })
        } else {
            alert("Unable to find city, please check your spelling.");
        }
    });
};

var currentTemp = function(lat, lon, city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=9f2a573047350fc85e320b551e5f6ee3&units=metric"

    fetch(apiUrl)
    .then(function(response) {
        if(response.ok) {
            response.json().then(function (data) {
                console.log(data);
                weatherDisp(data, city);
            })
        }
    });
};

var fiveDayforecast = function(location) {
    setDate();
    setFutureTemp(location);
    setFutureWind(location);
    setFutureHumidity(location);
};

var weatherDisp = function(info, city) {
    var date = moment().format("M/D/YYYY")
    var cityName = city;
    var iconE1 = document.createElement('img');
    iconE1.classList = "icon";
    
    //get current weather icon from API response
    iconE1.setAttribute("src", weatherIcon = "http://openweathermap.org/img/wn/" + info.current.weather[0].icon + ".png");
    cityLocation.textContent = cityName + " (" + date + ") ";
    cityLocation.appendChild(iconE1);
    
    //set Temperature, Wind, Humidity, and UV for chosen city
    cityTemp.textContent = "Temp: " + info.current.temp + "°C";
    cityWind.textContent = "Wind: " + info.current.wind_speed + " km/h";
    cityHumidity.textContent = "Humidity: " + info.current.humidity + "%";
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
};

//function to label next 5 days
var setDate = function() {
    oneDate.textContent = moment().add(1, 'd').format("M/D/YYYY");
    twoDate.textContent = moment().add(2, 'd').format("M/D/YYYY");
    threeDate.textContent = moment().add(3, 'd').format("M/D/YYYY");
    fourDate.textContent = moment().add(4, 'd').format("M/D/YYYY");
    fiveDate.textContent = moment().add(5, 'd').format("M/D/YYYY");
};

//function to show 5 day temperature forecast and icons
var setFutureTemp = function(temp) {
    oneTemp.textContent = "Temp: " + temp.daily[0].temp.day + "°C";
    twoTemp.textContent = "Temp: " + temp.daily[1].temp.day + "°C";
    threeTemp.textContent = "Temp: " + temp.daily[2].temp.day + "°C";
    fourTemp.textContent = "Temp: " + temp.daily[3].temp.day + "°C";
    fiveTemp.textContent = "Temp: " + temp.daily[4].temp.day + "°C";

    //get icon for each day's forecast
    var iconE1 = document.createElement('img');
    iconE1.classList = "icon";
    iconE1.setAttribute("src", weatherIcon = "http://openweathermap.org/img/wn/" + temp.daily[0].weather[0].icon + ".png");
    oneDate.appendChild(iconE1);

    var iconE2 = document.createElement('img');
    iconE2.classList = "icon";
    iconE2.setAttribute("src", weatherIcon = "http://openweathermap.org/img/wn/" + temp.daily[1].weather[0].icon + ".png");
    twoDate.appendChild(iconE2);
    
    var iconE3 = document.createElement('img');
    iconE3.classList = "icon";
    iconE3.setAttribute("src", weatherIcon = "http://openweathermap.org/img/wn/" + temp.daily[2].weather[0].icon + ".png");
    threeDate.appendChild(iconE3);
    
    var iconE4 = document.createElement('img');
    iconE4.classList = "icon";
    iconE4.setAttribute("src", weatherIcon = "http://openweathermap.org/img/wn/" + temp.daily[3].weather[0].icon + ".png");
    fourDate.appendChild(iconE4);
    
    var iconE5 = document.createElement('img');
    iconE5.classList = "icon";
    iconE5.setAttribute("src", weatherIcon = "http://openweathermap.org/img/wn/" + temp.daily[4].weather[0].icon + ".png");
    fiveDate.appendChild(iconE5);
};

//function to show 5 day wind forecast
var setFutureWind = function(wind) {
    oneWind.textContent = "Wind: " + wind.daily[0].wind_speed + " km/h";
    twoWind.textContent = "Wind: " + wind.daily[1].wind_speed + " km/h";
    threeWind.textContent = "Wind: " + wind.daily[2].wind_speed + " km/h";
    fourWind.textContent = "Wind: " + wind.daily[3].wind_speed + " km/h";
    fiveWind.textContent = "Wind: " + wind.daily[4].wind_speed + " km/h";
};

//function to show 5 day humidity forecast
var setFutureHumidity = function(humidity) {
    oneHum.textContent = "Humidity: " + humidity.daily[0].humidity + "%";
    twoHum.textContent = "Humidity: " + humidity.daily[1].humidity + "%";
    threeHum.textContent = "Humidity: " + humidity.daily[2].humidity + "%";
    fourHum.textContent = "Humidity: " + humidity.daily[3].humidity + "%";
    fiveHum.textContent = "Humidity: " + humidity.daily[4].humidity + "%";
};

userFormE1.addEventListener("submit", formSubmitHandler);
//forecastCall("Toronto");