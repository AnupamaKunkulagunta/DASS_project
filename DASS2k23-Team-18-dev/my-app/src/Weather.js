// Weather API

const weatherApiKey = '30b700006c615846972a9f8b7b4335c2\n';
function CheckWeather(latitude, longitude) {
   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}`;
   fetch(url)
      .then(response => response.json())
      .then(data => {
         // Check if it is currently raining
         const isRaining = data.weather[0].main === 'Rain';
         console.log(data.weather[0].main)
         console.log(`It is currently ${isRaining ? 'raining' : 'not raining'} near (${latitude}, ${longitude}).`);
         console.log(data)
         console.log(isRaining)
         return isRaining
      })
      .catch(error => {
         console.log(error);
      });
}

CheckWeather(30.0525, -101.0738)