const request = require("postman-request");

const forecast = (longitude, latitude, callback) => {
  const str = `${longitude},${latitude}`;
  const url = `http://api.weatherstack.com/current?access_key=3f7676256ea051fd43a714057b3d8714&query=${encodeURIComponent(
    str
  )}&units=f`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("oops can't connect to service!");
    } else if (response.body.error) {
      callback("Uanble to find location, try again");
    } else {
      const data = response.body;
      const temp = data.current.temperature;
      const feelsLike = data.current.feelslike;
      callback(
        undefined,
        `weather: ${data.current.weather_descriptions[0]}.  It is currently ${temp} degrees out. But it feels like ${feelsLike} degrees`
      );
    }
  });
};

module.exports = forecast;
