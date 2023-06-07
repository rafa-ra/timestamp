// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
// app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date?", (req, res) => {
  const isNumbersInput = (input) => {
    return /^\d+$/.test(input);
  };

  if (req.params.date === undefined) {
    const utcDataInput = new Date();
    const unixDataInput = Date.now();

    res.send({ unix: unixDataInput, utc: utcDataInput.toUTCString() });
  } else if (isNumbersInput(req.params.date)) {
    const dateInput = new Date(req.params.date * 1);
    isNaN(dateInput)
      ? res.send({ error: "Invalid Date" })
      : res.send({ unix: req.params.date * 1, utc: dateInput.toUTCString() });
  } else {
    const dateInput = new Date(req.params.date);

    isNaN(dateInput)
      ? res.send({ error: "Invalid Date" })
      : res.send({ unix: dateInput.getTime(), utc: dateInput.toUTCString() });
  }
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
