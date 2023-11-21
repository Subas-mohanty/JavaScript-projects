let cityName=document.getElementById("city");
const btnElement=document.querySelector("button");

async function getWeather (cityName){
    const apiKey=`https://api.weatherapi.com/v1/current.json?key=191bf9d0b46543dc9da173843232808&q=${cityName}&aqi=yes`;
    const api= await fetch(apiKey);
    const data= await api.json();

    // console.log(data);

    // document.querySelector(".cityName").innerHTML=data.location.name;
    // document.getElementById("cityName").innerHTML=data.location.name;
    document.getElementsByClassName("cityName")[0].innerHTML=data.location.name;
    document.getElementsByClassName("temperature")[0].innerHTML=data.current.temp_c + "°C"; 
    document.getElementsByClassName("humidity")[0].innerHTML=data.current.humidity + "%";
    document.getElementsByClassName("wind")[0].innerHTML=data.current.wind_kph + " km/h";

    localStorage.setItem("city",`${cityName}`);
    localStorage.setItem("humidity",`${data.current.humidity}`);
    localStorage.setItem("temp",`${data.current.temp_c }`);
    localStorage.setItem("wind",`${data.current.wind_kph }`);
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