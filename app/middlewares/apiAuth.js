const { Op } = require("sequelize");
const db = require("../models");
const clients = db.clients;
const clientAuthApi = db.clientAuthApi;

validateApiKey = async (req, res, next) => {
  if (!req.body.api_key) {
    res.status(400).send({ success: 0, message: "Enter Api key." });
    return;
  }
  console.log(req.hostname);
  const client = await clients
    .findOne({
      where: { api_key: req.body.api_key },
      attributes: ["id"],
      raw: true, // <--- HERE
    })
    .catch(function (err) {
      res.status(400).send({
        success: 0,
        message: "Some error occured.",
      });
      return;
    });

  if (client) {
    client_id = client.id;
    let requestSegments = req.path.split("/").filter((s) => {
      return s !== "";
    });

    var api = requestSegments[requestSegments.length - 1];
    var api_id = 1;

    const clientAuth = await clientAuthApi
      .findOne({
        where: {
          client_id: client_id,
          api_id: {
            [Op.or]: [6, api_id],
          },
        },
        attributes: ["subscription_end_date"],
        raw: true, // <--- HERE
      })
      .catch(function (err) {
        res.status(400).send({
          success: 0,
          message: "Some error occured2.",
        });
        return;
      });
    if (clientAuth) {
      const yourDate = new Date();
      const endDate = new Date(clientAuth.subscription_end_date);
      var today = yourDate.toISOString().split("T")[0];
      var diff = parseInt(Math.abs(endDate - yourDate) / (1000 * 60 * 60 * 24));
      if (diff == 0) {
        if (yourDate.getDate() != endDate.getDate()) {
          res.status(400).send({
            success: 0,
            message: "Subscription ended",
          });
          return;
        }
      } else if (diff < 0) {
        res.status(400).send({
          success: 0,
          message: "Subscription ended",
        });
        return;
      }
    } else {
      res.status(400).send({
        success: 0,
        message: "You are not authorized to access this api.",
      });
      return;
    }
  } else {
    res.status(400).send({
      success: 0,
      message: "Invalid Api key.",
    });
    return;
  }
  next();
};

const apiAuth = {
  validateApiKey: validateApiKey,
};

module.exports = apiAuth;
