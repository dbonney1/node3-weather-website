const weatherForm = document.querySelector('form');
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (typeof(document.getElementById('weather-forecast')) == 'undefined' || document.getElementById('weather-forecast') == null) {
        const newDiv = document.createElement('div');
        newDiv.setAttribute('id', 'weather-forecast');
        document.querySelector('.main-content').appendChild(newDiv);
    }

    let forecastDiv = document.getElementById('weather-forecast');
    forecastDiv.innerHTML = '';

    let location = document.getElementById('searchBox').value;
    
    // append loading icon gif until fetch request completes
    let loadingGif = document.createElement('img');
    loadingGif.setAttribute('src', '../images/loading.gif');
    forecastDiv.appendChild(loadingGif);

    // fetch the forecast data using location as an argument
    fetch(`http://localhost:3000/weather?address=${encodeURIComponent(location)}`).then(
    (response) => {
        response.json().then((data) => {
            forecastDiv.innerHTML = '';
            if (data.error) {
                forecastDiv.append(data.error);
            } else {
                forecastDiv.append(data.location);
                for (let key in data.forecast) {
                    let forecastElement = document.createElement('p')
                    forecastElement.textContent = `${key}: ${data.forecast[key]}`;
                    forecastDiv.appendChild(forecastElement);
                }
            }
        });
    });
});