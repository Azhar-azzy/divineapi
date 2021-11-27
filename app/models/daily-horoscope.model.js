module.exports = (sequelize, Sequelize) => {
  const dailyHoroscope = sequelize.define(
    "daily_horoscope",
    {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
      },
      h_date: {
        type: Sequelize.DATEONLY,
      },
      sign: {
        type: Sequelize.STRING,
      },
      personal: {
        type: Sequelize.TEXT,
      },
      health: {
        type: Sequelize.TEXT,
      },
      profession: {
        type: Sequelize.TEXT,
      },
      emotions: {
        type: Sequelize.TEXT,
      },
      travel: {
        type: Sequelize.TEXT,
      },
      luck: {
        type: Sequelize.TEXT,
      },
      added_by: {
        type: Sequelize.BIGINT,
      },
      created_at: {
        type: Sequelize.DATE,
      },
    },
    {
      timestamps: false,
      tableName: "daily_horoscope",
    }
  );

  return dailyHoroscope;
};
