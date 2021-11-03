const request = require("postman-request");

const Geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiaGV5aW1yaXlhIiwiYSI6ImNrdjJib3hiODA4cjcyd29idzZseWd1MjMifQ.dBApQmKV7OEKrUlrv72jyg&limit=1`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("oops service not available!");
    } else if (response.body.message) {
      callback("please provide the location!!");
    } else if (response.body.features.length === 0) {
      callback("unable to find location, try again!");
    } else {
      callback(undefined, {
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = Geocode;
