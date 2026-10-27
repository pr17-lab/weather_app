

const cityInput = document.getElementById("cityInput")
cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        getWeather()
    }
})
const backgrounds = {
    Clear: "clear",
    Clouds: "clouds",
    Rain: "rain",
    Drizzle: "rain",
    Thunderstorm: "thunder",
    Snow: "snow",
    Mist: "mist",
    Haze: "mist",
    Fog: "mist",
    Smoke: "mist"
}
async function getWeather() {

    const cityName = document.getElementById("cityInput").value.trim()
    const error = document.getElementById("error")
    const weather = document.getElementById("weather")
    const btn = document.getElementById("searchBtn")

    if (cityName === "") {
        error.textContent = "Please enter a city name";
        weather.classList.add("d-none");
        return;
    }

    error.textContent = ""

    btn.disabled = true
    

    try {

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`)
        const data = await response.json()

        if (!response.ok) {
            throw new Error("City not found")
        }

        document.getElementById("city").textContent =
            `${data.name}, ${data.sys.country}`

        document.getElementById("temperature").textContent =
            `${Math.round(data.main.temp)}°C`

        document.getElementById("description").textContent =
            data.weather[0].description

        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

        document.getElementById("feelsLike").textContent =
            `Feels like ${Math.round(data.main.feels_like)}°C`

        document.getElementById("humidity").textContent =
            `${data.main.humidity}%`

        document.getElementById("wind").textContent =
            `${data.wind.speed} m/s`

        document.getElementById("visibility").textContent =
            `${(data.visibility / 1000).toFixed(1)} km`

        const type = data.weather[0].main;
        document.body.className = backgrounds[type] || ""


        weather.classList.remove("d-none")

    } catch (err) {
        error.textContent = "City not found"
        weather.classList.add("d-none")
        

    } finally {
        btn.disabled = false
    }
}

