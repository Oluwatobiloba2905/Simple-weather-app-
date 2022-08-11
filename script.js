let weather = {
    apikey: "5bc2b4f40acfffa046713955a4370d52",
    fetchWeather: function (city) {
        fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=metric&appid=" +
                this.apikey
            )
            .then((response) => {
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        if (data.cod == "200") {
            getweather(data);
        } else if (data.cod == "400") {
            noinput(data);
        } else {
            citynotfound(data);
        }
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

function getweather(data) {
    const {
        name
    } = data;
    const {
        description,
        icon
    } = data.weather[0];
    const {
        temp,
        humidity
    } = data.main;
    const {
        speed
    } = data.wind;
    // console.log(name, icon, description, temp, humidity, speed);
    document.querySelector(".location-city").innerHTML = "Weather in " + name;
    document.querySelector(".temperature-degree").innerHTML = temp + "°C";
    document.querySelector(".weather-description").innerHTML = description;
    document.querySelector(".humidity").innerHTML = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerHTML = "Wind: " + speed + "Km/hr";
    document.querySelector(".weather ").classList.remove("loading");
    document.querySelector(".temperature-degree").style.position = "relative";
    document.querySelector(".temperature-degree").style.visibility = "visible";
    document.querySelector(".humidity").style.position = "relative";
    document.querySelector(".humidity").style.visibility = "visible";
    document.querySelector(".wind").style.position = "relative";
    document.querySelector(".wind").style.visibility = "visible";
}

function noinput(data) {
    document.querySelector(".location-city").innerHTML = "Something went wrong!";
    document.querySelector(".temperature-degree").style.position = "absolute";
    document.querySelector(".temperature-degree").style.visibility = "hidden";
    document.querySelector(".humidity").style.position = "absolute";
    document.querySelector(".humidity").style.visibility = "hidden";
    document.querySelector(".wind").style.position = "absolute";
    document.querySelector(".wind").style.visibility = "hidden";
}