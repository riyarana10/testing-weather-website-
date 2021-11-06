const path = require("path");
const express = require("express");
const hbs = require("hbs");
const Geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
// console.log(viewPath);
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "riya",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "riya",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    mssg: "Help me",
    title: "Help!",
    name: "riya",
  });
});
// app.get("", (req, res) => {
//   res.send("hello express!!!");
// });

// app.get("/help", (req, res) => {
//   res.send("hello help");
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About</h1>");
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "oops provide address for checking weather",
    });
  }
  Geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    }
    forecast(data.longitude, data.latitude, (error, forecastdata) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastdata,
        location: data.location,
        address: req.query.address,
      });
    });
  });
  // res.send({
  //   forecast: "it is raining",
  //   location: "khatima",
  // });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errormssg: "oops help article not found",
    name: "riya",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errormssg: "page not found",
    name: "riya",
  });
});

app.listen(port, () => {
  console.log("server is up on " + port);
});
