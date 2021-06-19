const api = {
    key: '&appid=e6128af498bb80e49e0850ddd4eaf599',
    url: 'http://api.openweathermap.org/data/2.5/weather?q='
}
const searchbox = document.querySelector('#text-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {

        getDisplayWeatherInformation();
    }
}

async function getDisplayWeatherInformation() {

    let cit = searchbox.value;
    url = `${api.url + cit + api.key}`;
    const response = await fetch(url);

    let data = await response.json(); // Convert to JSON
    print(data);
    setDisplayWeatherInformation(data);
    // document.body.style.backgroundImage = "url('Images/Night.jpg')";

    let unix = data.sys.sunrise;
    let date = new Date(unix * 1000);
    let sunrise = date.toTimeString().slice(0, 5);
    document.getElementById("sunriseTime").innerText = sunrise + '\nSunrise';

    console.log(date.toTimeString().slice(0, 5) + ' AM');
    unix = data.sys.sunset;
    date = new Date(unix * 1000);

    let sunset = date.toTimeString().slice(0, 5);
    document.getElementById("sunsetTime").innerText = sunset + '\nSunset';

    console.log(date.toTimeString().slice(0, 8) + ' PM');

    let windSpeed = data.wind.speed;
    let convert = windSpeed * 3.6;

    console.log(Math.round(convert) + ' KM/HR');

    let maxTemp = Math.round(data.main.temp_max - 273.15);
    let minTemp = Math.round(data.main.temp_min - 273.15);

    document.getElementById("highTemp").innerText = maxTemp + '°';
    console.log(maxTemp + ' High');
    console.log(minTemp + 'Low');
    document.getElementById("lowTemp").innerText = minTemp + '°';
    document.getElementById("windSpeed").innerText = windSpeed + 'km/hr\nWind';


}

function setDisplayWeatherInformation(data) {
    let degrees = document.getElementById('temp').innerText = `${getTemperature(data) + "°C"}`;
    let countryName = document.getElementById('countryName').innerText = `${getCountryName(data)}`;
    let weatherDescription = document.getElementById('weatherDescription').innerText = `${getWeatherDescription(data)}`;
}

function getTemperature(data) {
    let temperature = kelvinToDegrees(data);
    return temperature;
}

function getCountryName(data) {
    let countryName = data.name + ', ' + data.sys.country;
    return countryName;
}

function getWeatherDescription(data) {
    let weatherDescription = data.weather[0].description;
    return weatherDescription;
}

function kelvinToDegrees(data) {
    return Math.round(data.main.temp - 273.15);
}

function print(output) {
    console.log(output);
}