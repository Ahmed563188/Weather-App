async function getWeather(lat, lon) {
    try {
        const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&forecast_days=3&timezone=auto`
        );
        const data = await res.json();

        document.getElementById("location").innerText = ` Current Location: ${lat.toFixed(2)}, ${lon.toFixed(2)}`;

        document.getElementById("current-temp").innerText = `${data.current.temperature_2m}°C`;

        const forecastData = data.daily;
        let forecastHTML = "";
        for (let i = 1; i <= 2; i++) {
            forecastHTML += `Day ${i}:  Max ${forecastData.temperature_2m_max[i]}° / Min ${forecastData.temperature_2m_min[i]}°<br><br>`;
        }
        document.getElementById("forecast").innerHTML = forecastHTML;

    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById("location").innerText = " Error fetching weather data";
    }
}

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getWeather(lat, lon);
    }, (error) => {
        document.getElementById("location").innerText = " Unable to get location";
        console.error(error);
    });
} else {
    document.getElementById("location").innerText = " Geolocation not supported by this browser";
}