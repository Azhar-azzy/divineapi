const { authJwt, apiAuth } = require("../middlewares");
const controller = require("../controllers/api.controller");
const { body, validationResult } = require("express-validator");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test", controller.allAccess);

  app.post(
    "/api/2.0/daily_horoscope",
    [apiAuth.validateApiKey, apiAuth.checkApiValidity],
    controller.dailyHoroscope
  );
};
