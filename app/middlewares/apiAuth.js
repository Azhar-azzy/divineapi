const { Op } = require("sequelize");
const db = require("../models");
const clients = db.clients;
const clientAuthApi = db.clientAuthApi;

validateApiKey = async (req, res, next) => {
  // check if api key exists
  const { api_key } = req.body;
  if (!api_key) {
    res.status(400).send({ success: 0, message: "Enter Api key." });
    return;
  }
  var client;
  // check if a client with this api key exists
  try {
    client = await clients.findOne({
      where: {
        api_key,
        source_url: {
          [Op.or]: ["localhost", req.hostname],
        },
      },
      attributes: ["id"],
      raw: true,
    });
  } catch (error) {
    res.status(500).send({
      success: 0,
      message: "Some error occured.",
    });
    return;
  }

  if (!client) {
    res.status(400).send({
      success: 0,
      message: "You are not authorized to access this api.",
    });
    return;
  }

  // check if the client has an active subscription
  const requestSegments = req.path.split("/").filter((s) => {
    return s !== "";
  });
  const api = requestSegments[requestSegments.length - 1];
  const api_id = 1;

  var clientAuth;
  try {
    clientAuth = await clientAuthApi.findOne({
      where: {
        client_id: client.id,
        api_id: {
          [Op.or]: [6, api_id],
        },
      },
      attributes: ["subscription_end_date"],
      raw: true,
    });
  } catch (error) {
    res.status(500).send({
      success: 0,
      message: "Some error occured.",
    });
    return;
  }

  if (!clientAuth) {
    res.status(400).send({
      success: 0,
      message: "You are not authorized to access this api.",
    });
    return;
  }
  const currentDate = new Date();
  const endDate = new Date(clientAuth.subscription_end_date);
  const diff = parseInt(
    Math.abs(endDate - currentDate) / (1000 * 60 * 60 * 24)
  );
  if (diff <= 0 && currentDate.getDate() != endDate.getDate()) {
    res.status(400).send({
      success: 0,
      message: "Subscription ended",
    });
    return;
  }
  next();
};

const apiAuth = {
  validateApiKey: validateApiKey,
  // checkApiValidity: checkApiValidity,
};

module.exports = apiAuth;
