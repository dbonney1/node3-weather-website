const request = require("request");

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicnBlb3BsZXIiLCJhIjoiY2tlNGk3N3phMHN5MDJ0cDhoY2hxOTc0MyJ9.Qz7ir-yX7KFuh_C1_Rrv8A&limit=1`;

    request({ url, json: true}, (error, { body }) => {

        if (error) {
            callback('Unable to connect to location services.', undefined);
        } else if (body.features.length === 0) {
            callback("Unable to find location, try again with a different search term.", undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;