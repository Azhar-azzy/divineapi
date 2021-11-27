module.exports = (sequelize, Sequelize) => {
  const clientAuthApi = sequelize.define(
    "client_auth_api",
    {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
      },
      client_id: {
        type: Sequelize.BIGINT,
      },
      api_id: {
        type: Sequelize.BIGINT,
      },
      subscription_end_date: {
        type: Sequelize.DATEONLY,
      },
      subscription_amount: {
        type: Sequelize.FLOAT,
      },
    },
    {
      timestamps: false,
      tableName: "client_auth_api",
    }
  );

  return clientAuthApi;
};
