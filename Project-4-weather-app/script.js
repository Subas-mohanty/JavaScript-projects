let cityName=document.getElementById("city");
const btnElement=document.querySelector("button");
async function getWeather(cityName) {
    try {
        const apiKey = `https://api.weatherapi.com/v1/current.json?key=191bf9d0b46543dc9da173843232808&q=${cityName}&aqi=yes`;
        const api = await fetch(apiKey);

        if (!api.ok) {
            throw new Error(`Failed to fetch weather data: ${api.status}`);
        }

        const data = await api.json();

        document.getElementsByClassName("cityName")[0].innerHTML = data.location.name;
        document.getElementsByClassName("temperature")[0].innerHTML = data.current.temp_c + "°C";
        document.getElementsByClassName("humidity")[0].innerHTML = data.current.humidity + "%";
        document.getElementsByClassName("wind")[0].innerHTML = data.current.wind_kph + " km/h";

        localStorage.setItem("city", `${cityName}`);
        localStorage.setItem("humidity", `${data.current.humidity}`);
        localStorage.setItem("temp", `${data.current.temp_c}`);
        localStorage.setItem("wind", `${data.current.wind_kph}`);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}
btnElement.addEventListener("click",async ()=>{
    getWeather(cityName.value)
});
window.addEventListener("load",()=>{
    document.getElementsByClassName("cityName")[0].innerHTML=localStorage.getItem("city");
    document.getElementsByClassName("temperature")[0].innerHTML=localStorage.getItem("temp")+ "°C"; 
    document.getElementsByClassName("humidity")[0].innerHTML=localStorage.getItem("humidity")+ "%";
    document.getElementsByClassName("wind")[0].innerHTML=localStorage.getItem("wind") + " km/h";
})