function clickHandleSearch() {
    const myAPIKey = "b6aafb82ecdd4a199157a229c3a40f07";
    const address = document.getElementById("address").value;
    if (!address || address.length < 3) {
        console.log("The address string is too short. Enter at least three symbols");
        return;
    }

    const geocodingUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${myAPIKey}`;

    // call Geocoding API - https://www.geoapify.com/geocoding-api/
    fetch(geocodingUrl).then(result => result.json())
        .then(featureCollection => test(featureCollection));
}

function test(featureCollection) {
    const div = document.querySelector(".card-img-overlay")
    const weatherApiKey = "5a22126288e2fc213562f79cbf956c02";
    let lat = featureCollection.features[0].properties.lat;
    let lon = featureCollection.features[0].properties.lon;
    const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`

    fetch(openWeatherUrl).then(data => data.json())
        .then(collectionWeatherData => {

            div.innerHTML = `<h4 class="mb-0">${collectionWeatherData.name}, ${collectionWeatherData.sys.country}</h4>
            <p class="display-2 my-3">${collectionWeatherData.main.temp}°F</p>
            <p class="mb-2">Feels Like: <strong>${collectionWeatherData.main.feels_like}°F</strong></p>
            <p class="mb-2">Max: <strong>${collectionWeatherData.main.temp_max}°F</strong></p>
            <p class="mb-2">Min: <strong>${collectionWeatherData.main.temp_min}°F</strong></p>
            <h5>${collectionWeatherData.weather[0].main}</h5>
            `


        });
}