const apiKey ="96bad30255ae1e2e1c79b43ca5cf1a0f";
const defaultCity ="Cardiff";
const apiUrl =city => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

const fetchData= async(city = defaultCity) =>{
    try{
        const response= await fetch(apiUrl(city));
        if(!response.ok){
            throw new Error("Error fetching data........")
        }
        const data = await response.json();
        console.log(data)

        const dateTime = new Date(data.dt * 1000).toLocaleString();

        let icon = data.weather[0].icon 
        
        document.getElementById("weatherIcon").innerHTML = `<img class="weathericon" src="https://openweathermap.org/img/wn/${icon}@2x.png"></img>`
        document.getElementById("cityName").innerHTML = `${data.name}, ${data.sys.country}`;
        document.getElementById("dateAndTime").innerHTML = dateTime;
        document.getElementById("weatherStatus").innerHTML = data.weather[0].main;
        document.getElementById("weatherDescription").innerHTML = data.weather[0].description;
        document.getElementById("temperatureMax").innerHTML =`Max temp: ${data.main.temp_max}°C`;
        document.getElementById("temperatureMin").innerHTML =`Min temp:${data.main.temp_min}°C`;
        document.getElementById("pressure").innerHTML = `Pressure: ${data.main.pressure} hPa`;
        document.getElementById("humidity").innerHTML = `Humidity: ${data.main.humidity}%`;
        document.getElementById("windSpeed").innerHTML = `Wind Speed: ${data.wind.speed} m/s`;
    }catch(err){
        alert("Please enter the city name")
        console.log(err);
    }
}
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("btn").addEventListener("click", () => {
        fetchData(document.getElementById("search").value);
        document.getElementById("search").value = "";
    });
});
fetchData();