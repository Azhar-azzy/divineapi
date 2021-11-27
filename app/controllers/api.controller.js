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

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Tutorial
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  // Save Tutorial in the database
  Tutorial.create(tutorial)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  var domain = req.hostname;
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Tutorial.findAll({ where: condition })
    .then((data) => {
      res.send(domain);
      //res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id,
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Tutorial.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    });
};

// find all published Tutorial
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
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
