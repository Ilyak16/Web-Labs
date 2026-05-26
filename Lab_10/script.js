let weatherData = [];
let currentIndex = 0;

async function loadWeather() {

  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=55.03&longitude=82.92&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto";

  const response = await fetch(url);

  const data = await response.json();

  weatherData = data.daily.time.map((date, index) => ({
    date: date,
    max: data.daily.temperature_2m_max[index],
    min: data.daily.temperature_2m_min[index],
    rain: data.daily.precipitation_sum[index]
  }));

  showDay(currentIndex);
}

function showDay(index) {

  const day = weatherData[index];

  document.getElementById("date").textContent = day.date;

  document.getElementById("temp").textContent =
    `${day.max}°C`;

  document.getElementById("info").innerHTML = `
    Мин. температура: ${day.min}°C<br>
    Осадки: ${day.rain} мм
  `;
}

function nextDay() {

  currentIndex++;

  if (currentIndex >= weatherData.length) {
    currentIndex = 0;
  }

  showDay(currentIndex);
}

function prevDay() {

  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = weatherData.length - 1;
  }

  showDay(currentIndex);
}

loadWeather();