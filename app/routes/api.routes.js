module.exports = (app) => {
  const { authJwt, apiAuth } = require("../middlewares");
  const controller = require("../controllers/api.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", controller.create);

  // Retrieve all Tutorials
  router.get("/", controller.findAll);

  // Retrieve all published Tutorials
  router.get("/published", controller.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", controller.findOne);

  // Update a Tutorial with id
  router.put("/:id", controller.update);

  // Delete a Tutorial with id
  router.delete("/:id", controller.delete);

  // Delete all Tutorials
  router.delete("/", controller.deleteAll);

  app.use("/api/tutorials", router);
};
