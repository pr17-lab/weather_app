
async function getWeather() {

    const cityName = document.getElementById("cityInput").value.trim();
    const error = document.getElementById("error");
    const weather = document.getElementById("weather");

    error.textContent = "";

    try {

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`);
        const data = await response.json();

        // Display city and temperature
        document.getElementById("city").textContent =
            `${data.name}, ${data.sys.country}`;

        document.getElementById("temperature").textContent =
            `${Math.round(data.main.temp)}°C`;

        document.getElementById("description").textContent =
            data.weather[0].description;

        // Display weather icon
        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        // Display additional details
        document.getElementById("feelsLike").textContent =
            ` ${Math.round(data.main.feels_like)}°C`;

        document.getElementById("humidity").textContent =
            `${data.main.humidity}%`;

        document.getElementById("wind").textContent =
            `${data.wind.speed} m/s`;

        document.getElementById("visibility").textContent =
            `${(data.visibility / 1000).toFixed(1)} km`;

        weather.classList.remove("d-none");

    } catch (er) {

        error.textContent = "Error: " + er.message;
        weather.classList.add("d-none");

    }
}


