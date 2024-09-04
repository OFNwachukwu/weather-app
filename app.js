const weatherform = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "8d327a67669d64ce0e6c08e9c2c96091";

weatherform.addEventListener("click", async (event) => {
  event.preventDefault();

  const city = cityInput.value;

  if (city) {
      try {
        const weatherData = await getweatherData(city)
        displayweatherInfo(weatherData)
      } catch (error) {
        console.error(error);
        displayError(error);
      }
  } else {
    displayError("Please enter a city");
  }
});

async function getweatherData(city) {
  // Implementation for fetching weather data goes here
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl)
if (!response.ok) {
  throw new Error('Could not fetch weather')
}
return await response.json();
}

function displayweatherInfo(data) {
  // Implementation for displaying weather data goes here
  const {name: city,
     main: {temp, humidity},
     weather: [{description, id }]} = data;

     card.textContent = ''
     card.style.display = 'flex'

     const cityDisplay = document.createElement('h1');
     const tempDisplay = document.createElement('p');
     const humidityDisplay = document.createElement('p');
     const descDisplay = document.createElement('p');
     const weatherEmoji = document.createElement('p');

     cityDisplay.textContent = city;
     tempDisplay.textContent = `${temp} °k `
     humidityDisplay.textContent = `Humidity: ${humidity}%`
     descDisplay.textContent = description
     weatherEmoji.textContent = getweatherEmoji(id)

     cityDisplay.classList.add('cityDisplay')
     tempDisplay.classList.add('tempDisplay')
     humidityDisplay.classList.add('humidityDisplay')
     descDisplay.classList.add('descDisplay')
     weatherEmoji.classList.add('weatherEmoji')

     card.appendChild(cityDisplay)
     card.appendChild(tempDisplay)
     card.appendChild(humidityDisplay)
     card.appendChild(descDisplay)
     card.appendChild(weatherEmoji)
}

function getweatherEmoji(weatherId) {
  // Implementation for getting weather emoji goes here
  switch (true) {
    case (weatherId >= 200 && weatherId < 300):
      return '🌩';
      case (weatherId >= 300 && weatherId < 400):
      return '🌧';
      case (weatherId >= 500 && weatherId < 600):
      return '🌩';
      case (weatherId >= 600 && weatherId < 700):
      return ' ❄';
      case (weatherId >= 700 && weatherId < 800):
      return '🌫';
      case (weatherId === 800):
        return '☀';
        case (weatherId >= 801 && weatherId < 810):
          return '☁'
      break;
    default:
      return '?';
      break;
  }
}

function displayError(message) {
  const errorDisplay = document.createElement("p"); // Use createElement instead of createElementNS for standard HTML elements
  errorDisplay.textContent = message; // Fixed typo from textConent to textContent
  errorDisplay.classList.add("errorDisplay");

  card.textContent = ""; // Clear any previous content
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
