const { authJwt, apiAuth } = require("../middlewares");
const controller = require("../controllers/api.controller");
// const { body, validationResult } = require("express-validator");

var router = require("express").Router();

module.exports = function (app) {
  router.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.get("/hi", (req, res) => res.send("Hello World"));

  router.get("/api/test", controller.allAccess);

  router.post(
    "/api/2.0/daily_horoscope",
    apiAuth.validateApiKey,
    // [apiAuth.validateApiKey, apiAuth.checkApiValidity],
    controller.dailyHoroscope
  );

  app.use("/api", router);
};
