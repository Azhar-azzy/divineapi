const config = require("../config/config.js");
const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize(
  config.db.DB_NAME,
  config.db.DB_USER,
  config.db.DB_PASS,
  {
    host: config.db.DB_HOST,
    dialect: config.db.dialect,
    operatorsAliases: false,

    poll: {
      max: config.db.pool.max,
      min: config.db.pool.min,
      acquire: config.db.pool.acquire,
      idle: config.db.pool.idle,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;

db.dailyHoroscope = require("./daily-horoscope.model.js")(sequelize, Sequelize);
db.clientAuthApi = require("./client-auth-api.model.js")(sequelize, Sequelize);
db.clients = require("./clients.model.js")(sequelize, Sequelize);

module.exports = db;
