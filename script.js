

function getWeather(query) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var apiKey = "e8bef05118c14c0b83134653233006";
    var apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}`;
  
    // Fetch current weather data
    fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        var weatherInfo = document.getElementById("weatherInfo");
        console.log(data)
        weatherInfo.innerHTML = `
        <div class="left">
          <h2>${data.location.name} , ${data.location.country}</h2>
          <p>${data.location.localtime}</p>

        </div>
        <div class="middle">
            <img src="${data.current.condition.icon}"/><br/>
            <p>${data.current.condition.text}</p><br/>
            <p>cloudy : ${data.current.cloud}%</p>
        </div>
        <div class="right">
            <p>HUMIDITY : ${data.current.humidity}%</p>
            <p>WIND SPEED : ${data.current.wind_kph}kph</p>
            <p>TEMPERATURE : ${data.current.temp_c}°C</p>
        </div>
        `;
      })
      .catch(function(error) {
        console.log(error);
      });
  
    // Fetch 7-day forecast data
    var forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=8`;
  
    fetch(forecastUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        var forecastInfo = document.getElementById("forecastInfo");
          console.log(data)
          forecastInfo.innerHTML ='' ;
        for (var i = 1; i < data.forecast.forecastday.length; i++) {
          var date = new Date(data.forecast.forecastday[i].date);
          forecastInfo.innerHTML += `
          <div class="card">
            <h4>${days[date.getDay()]}</h4>
            <img src="${data.forecast.forecastday[i].day.condition.icon}"/>
            <p>max : ${data.forecast.forecastday[i].day.maxtemp_c}°C</p>
            <p>min : ${data.forecast.forecastday[i].day.mintemp_c}°C</p>
          </div>
          `;
        }
      })
      .catch(function(error) {
        console.log(error);
      });
}



function getCity(coordinates) {
  const token = 'pk.b96b957516ede5b5f1e1b4c0ab070025'
  let lat = coordinates[0];
  let lng = coordinates[1];
  let url = `https://us1.locationiq.com/v1/reverse.php?key=${token}&lat=${lat}&lon=${lng}&format=json`
  fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    let city = `${data.address.city || 'new delhi'}`
    getWeather(city)
  })
  .catch(function(error) {
    console.log(error);
  });
}

let btn = document.getElementById('current_location')
btn.addEventListener('click',()=>{
  let loacation;
  // geting device loaction
  navigator.geolocation.getCurrentPosition((position) => {
    // getCity(loacation)
    loacation = [position.coords.latitude,position.coords.longitude]
    getCity(loacation)
  }, (error) => {
    console.log(error);
  });
})

// for search field result
function searchHandler(){
  var city = document.getElementById("cityInput").value;
  getWeather(city);
}