const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./app/config/config.js");

const app = express();

const corsOptions = {
  origin: "http://127.0.0.1:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;
db.sequelize.sync().then(() => {
  console.log("hiiiiiiiiiiiii");
  // initial(); // Just use it in development, at the first time execution!. Delete it in production
});

// simple route
app.get("/", (req, res) => {
  res.json({
    message: "Hi there, welcome to this tutorial.",
    domain: req.hostname,
  });
});

// api routes
//require("./app/routes/book.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/api.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
