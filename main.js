async function fetchData() {
  const section = document.querySelector(".weather");
  const cardBody = document.querySelector(".card-body");

  //search for the country
  const city = document.getElementById("city");
  //current weather of the country
  const output = document.querySelector(".output");

  //search button
  const btn = document.querySelector(".btn");

  const APIKey = "1766be0a6a8e187ba1e1529913747165";
  btn.addEventListener("click", async () => {
    let cityName = city.value.toLowerCase().trim();

    let geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${APIKey}`;

    const geocodingRes = await fetch(geocodingUrl);
    const geocodingData = await geocodingRes.json();

    if (!geocodingData || geocodingData.length === 0) {
      output.textContent = "City not found!";
      return;
    }

    const { lat, lon, name } = geocodingData[0];

    const wheatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`;
    const weatherRs = await fetch(wheatherUrl);
    const weatherData = await weatherRs.json();
    console.log(weatherData);
    let temprature = weatherData.main;
    let description = weatherData.weather[0];
    const localTime = new Date((weatherData.dt + weatherData.timezone) * 1000);
    const hour = localTime.getUTCHours();

    if (hour >= 6 && hour < 18) {
      //Day Time
      section.style.background = "linear-gradient(to top, #ffc1b6, #ffd5c2)";
      cardBody.style.background = "linear-gradient(to top, #ff5e62, #ff9966)";

      btn.style.backgroundColor = "#ff5722";
      btn.style.color = "#ffffff";
      btn.onmouseover = () => (button.style.backgroundColor = "#e64a19");
      btn.onmouseout = () => (button.style.backgroundColor = "#ff5722");
      output.textContent = `${description.description} ${Math.round(
        temprature.temp
      )}°C`;
    } else {
      //Night Time
      section.style.background = "linear-gradient(to top, #aabac5, #e0e4e7)";
      cardBody.style.background = "linear-gradient(to top, #2c3e50, #bdc3c7)";

      btn.style.backgroundColor = "#42a5f5";
      btn.style.color = "#ffffff";
      btn.onmouseover = () => (button.style.backgroundColor = "#1e88e5");
      btn.onmouseout = () => (button.style.backgroundColor = "#42a5f5");

      output.textContent = `${description.description} ${Math.round(
        temprature.temp
      )}°C`;
    }
  });
}
fetchData();

/**
  const geocoding = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&appid=${APIKey}`;
  const geocodingRes = await fetch(geocoding);
  const geocodingData = await geocodingRes.json();

  const wheatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`;
  const weatherRs = await fetch(wheatherUrl);
  const weatherData = await weatherRs.json();
 
 */
