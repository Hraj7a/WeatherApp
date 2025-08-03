async function fetchData() {
  const section = document.querySelector(".weather");
  const cardBody = document.querySelector(".card-body");
  const cityInput = document.getElementById("city");
  const output = document.querySelector(".output");
  const icon = document.querySelector(".weather-icon");
  const btn = document.querySelector(".btn");
  const suggestions = document.getElementById("suggestions");

  const APIKey = "1766be0a6a8e187ba1e1529913747165";
  const ApiKeyAuto = "4462a8e78bd44d5e9e613f3cd3b35426";

  let selectedCoords = null;

  cityInput.addEventListener("input", async () => {
    const input = cityInput.value.toLowerCase().trim();
    if (input.length < 2) {
      suggestions.textContent = "";
      return;
    }

    const autoCompleteUrl = `https://api.geoapify.com/v1/geocode/autocomplete?text=${input}&apiKey=${ApiKeyAuto}`;
    const response = await fetch(autoCompleteUrl);
    const data = await response.json();
    suggestions.innerHTML = "";

    data.features.forEach((place) => {
      const li = document.createElement("li");
      li.textContent = place.properties.formatted;

      li.onclick = () => {
        cityInput.value =
          place.properties.city ||
          place.properties.name ||
          place.properties.formatted;

        selectedCoords = {
          lat: place.properties.lat,
          lon: place.properties.lon,
        };

        suggestions.innerHTML = "";
      };

      suggestions.appendChild(li);
    });
  });

  btn.addEventListener("click", async () => {
    // ✅ Check if coords were selected
    if (!selectedCoords) {
      output.textContent = "Please select a city from the suggestions.";
      return;
    }

    const { lat, lon } = selectedCoords;

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`;
    const weatherRs = await fetch(weatherUrl);
    const weatherData = await weatherRs.json();
    console.log(weatherData);

    let temprature = weatherData.main;
    let description = weatherData.weather[0];
    const localTime = new Date((weatherData.dt + weatherData.timezone) * 1000);
    const hour = localTime.getUTCHours();

    if (hour >= 6 && hour < 18) {
      // Day
      section.style.background = "linear-gradient(to top, #ffc1b6, #ffd5c2)";
      cardBody.style.background = "linear-gradient(to top, #ff5e62, #ff9966)";
      btn.style.backgroundColor = "#ff5722";
      btn.style.color = "#ffffff";
      btn.onmouseover = () => (btn.style.backgroundColor = "#e64a19");
      btn.onmouseout = () => (btn.style.backgroundColor = "#ff5722");
      icon.textContent = `☀️`;
    } else {
      // Night
      section.style.background = "linear-gradient(to top, #aabac5, #e0e4e7)";
      cardBody.style.background = "linear-gradient(to top, #2c3e50, #bdc3c7)";
      btn.style.backgroundColor = "#42a5f5";
      btn.style.color = "#ffffff";
      btn.onmouseover = () => (btn.style.backgroundColor = "#1e88e5");
      btn.onmouseout = () => (btn.style.backgroundColor = "#42a5f5");
      icon.textContent = `🌙`;
    }

    output.textContent = `${description.description} ${Math.round(
      temprature.temp
    )}°C`;
  });
}

fetchData();
