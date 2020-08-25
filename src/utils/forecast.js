const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=42f555f14db6b8e4482bfc4715b437a9&query=${latitude},${longitude}&units=f`;
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service.", undefined)
        } else if (body.error) {
            callback("Unable to find location.", undefined);
        } else {
            callback(undefined, {
                location: body.location.name,
                currentTemp: body.current.temperature,
                heatIndex: body.current.feelslike,
                rainChance: `${(body.current.precip * 100)}%`
            });
        }
    });
}

module.exports = forecast;