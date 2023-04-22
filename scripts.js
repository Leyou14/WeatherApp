const api = "091210c677756fe00082eade71100e96";
 
const iconImg = document.getElementById("weather-icon");
const loc = document.querySelector("#location");
const tempC = document.querySelector(".c");
const tempF = document.querySelector(".f");
const desc = document.querySelector(".desc");
const sunriseDOM = document.querySelector(".sunrise");
const sunsetDOM = document.querySelector(".sunset");

window.addEventListener('load', () => { 
    let long;
    let lat;
// Accessing Geolocation of user
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position)
            // Storing Longitude & Latitude in variables
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const base =
              "https://api.openweathermap.org/data/2.5/weather?lat=38.7091474&lon=-77.2060128&appid=091210c677756fe00082eade71100e96&units=metric";
            console.log(base);
            fetch(base).then((response) => {
                return response.json();
            }).then((data) => {
              const { temp } = data.main;
              const place = data.name;
              const { description, icon } = data.weather[0];
              const { sunrise, sunset } = data.sys;

              const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
              const fahrenheit = (temp * 9) / 5 + 32;

              //converting Epoch(Unix) time to GMT
              const sunriseGMT = new Date(sunrise * 1000);
              const sunsetGMT = new Date(sunset * 1000);
              iconImg.src = iconUrl;

              loc.textContent = `${place}`;
              desc.textContent = `${description}`;
              tempC.textContent = `${temp.toFixed(2)} °C`;
              tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
              //Alt + 0176= degree sign
              sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
              sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
              //the toFixed(2) method is used so that the degree shows up to two decimal places only.
            })
        });
    }
});



