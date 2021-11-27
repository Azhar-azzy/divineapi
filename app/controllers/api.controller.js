const db = require("../models");
const dailyHoroscope = db.dailyHoroscope;
const clientAuthApi = db.clientAuthApi;
const clients = db.clients;
const Op = db.Sequelize.Op;
var Regex = require("regex");

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

exports.dailyHoroscope = (req, res) => {
  if (!req.body.sign) {
    res.status(400).send({ success: 0, message: "Enter zodiac sign." });
    return;
  }
  if (!req.body.date) {
    res.status(400).send({ success: 0, message: "Enter date." });
    return;
  } else {
    if (!(new Date(req.body.date).getTime() > 0)) {
      res.status(400).send({ success: 0, message: "Invalid date format." });
      return;
    }
    const yourDate = new Date();
    var today = yourDate.toISOString().split("T")[0];
    var diff = parseInt(
      (yourDate - new Date(req.body.date)) / (1000 * 60 * 60 * 24)
    );
    if (false) {
      res.status(400).send({
        success: 0,
        message: "You can only access yesterday, today and tomorrow data.",
      });
      return;
    }
  }

  dailyHoroscope
    .findAll({
      where: { sign: req.body.sign, h_date: req.body.date },
      attributes: [
        "sign",
        "personal",
        "health",
        "profession",
        "emotions",
        "travel",
        "luck",
      ],
    })
    .then((data) => {
      if (isEmpty(data)) res.send({ success: 0, message: "No data found!!!" });
      else {
        var result = {};
        result.success = 1;
        result.msg = "Daily horoscope result.";
        data[0].luck = JSON.parse(data[0].luck);
        result.data = data[0];
        res.status(200).send(result);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

exports.allAccess = (req, res) => {
  var sign = "aries";
  var h_date = "2021-06-26";
  var condition = sign ? { sign: { [Op.like]: `%${sign}%` } } : null;
  dailyHoroscope
    .findAll({
      where: { sign: sign, h_date: h_date },
      attributes: [
        "sign",
        "h_date",
        "personal",
        "health",
        "profession",
        "emotions",
        "travel",
        "luck",
      ],
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

exports.userBoard = (req, res) => {
  //var condition = sign ? { sign: { [Op.like]: `%${sign}%` } } : null;
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
