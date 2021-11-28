const { Op } = require("sequelize");
const db = require("../models");
const clients = db.clients;
const clientAuthApi = db.clientAuthApi;

// validateApiKey = (req, res, next) => {
//   if (!req.body.api_key) {
//     res.status(400).send({ success: 0, message: "Enter Api key." });
//     return;
//   }
//   clients
//     .findOne({
//       where: {
//         api_key: req.body.api_key,
//         source_url: {
//           [Op.or]: ["localhost", req.hostname],
//         },
//       },
//       attributes: ["id"],
//     })
//     .then((data) => {
//       if (data) {
//         console.log(data.dataValues.id);
//         res.locals.client_id = data.dataValues.id;
//       } else {
//         res.status(400).send({
//           success: 0,
//           message: "You are not authorized to access this api.",
//         });
//         return;
//       }
//       next();
//     });
// };

// // client apikey -> domain
// // client auth api -> 2 -> 30 nov
// // daily horoscope
// checkApiValidity = (req, res, next) => {
//   let requestSegments = req.path.split("/").filter((s) => {
//     return s !== "";
//   });

//   if (res.locals.client_id) var client_id = res.locals.client_id;
//   var api = requestSegments[requestSegments.length - 1];
//   var api_id = 1;

//   clientAuthApi
//     .findOne({
//       where: {
//         client_id: client_id,
//         api_id: {
//           [Op.or]: [6, api_id],
//         },
//       },
//       attributes: ["subscription_end_date"],
//     })
//     .then((data) => {
//       if (data) {
//         // console.log(data.dataValues);
//         const yourDate = new Date();
//         const endDate = new Date(data.dataValues.subscription_end_date);
//         var today = yourDate.toISOString().split("T")[0];
//         var diff = parseInt(
//           Math.abs(endDate - yourDate) / (1000 * 60 * 60 * 24)
//         );
//         if (diff == 0) {
//           if (yourDate.getDate() != endDate.getDate()) {
//             res.status(400).send({
//               success: 0,
//               message: "Subscription ended",
//             });
//             return;
//           }
//         } else if (diff < 0) {
//           res.status(400).send({
//             success: 0,
//             message: "Subscription ended",
//           });
//           return;
//         }
//       }
//       next();
//     });
// };

validateApiKey = async (req, res, next) => {
  // check if api key exists
  const { api_key } = req.body;
  if (!api_key) {
    res.status(400).send({ success: 0, message: "Enter Api key." });
    return;
  }

  // check if a client with this api key exists
  const client = await clients.findOne({
    where: {
      api_key,
      source_url: {
        [Op.or]: ["localhost", req.hostname],
      },
    },
    attributes: ["id"],
    raw: true,
  });
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
  const clientAuth = await clientAuthApi.findOne({
    where: {
      client_id: client.id,
      api_id: {
        [Op.or]: [6, api_id],
      },
    },
    attributes: ["subscription_end_date"],
    raw: true,
  });
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
