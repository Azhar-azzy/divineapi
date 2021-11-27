module.exports = (sequelize, Sequelize) => {
  const clients = sequelize.define(
    "horoscope_clients",
    {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
      },
      fname: {
        type: Sequelize.STRING,
      },
      lname: {
        type: Sequelize.STRING,
      },
      mobile_no: {
        type: Sequelize.STRING,
      },
      email_id: {
        type: Sequelize.STRING,
      },
      client_ip: {
        type: Sequelize.STRING,
      },
      country_id: {
        type: Sequelize.INTEGER,
      },
      image: {
        type: Sequelize.STRING,
      },
      device_token: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      mobile_verified: {
        type: Sequelize.INTEGER,
      },
      token: {
        type: Sequelize.STRING,
      },
      token_validupto: {
        type: Sequelize.DATE,
      },
      api_key: {
        type: Sequelize.STRING,
      },
      source_url: {
        type: Sequelize.STRING,
      },
      source_ip: {
        type: Sequelize.STRING,
      },
      bypass_ip: {
        type: Sequelize.INTEGER,
      },
      trial_end_date: {
        type: Sequelize.DATEONLY,
      },
      subscription_type: {
        type: Sequelize.INTEGER,
      },
      subscription_end_date: {
        type: Sequelize.DATEONLY,
      },
      subscription_amount: {
        type: Sequelize.FLOAT,
      },
      address: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      postal_code: {
        type: Sequelize.STRING,
      },
      registered_on: {
        type: Sequelize.DATEONLY,
      },
      profile_complete: {
        type: Sequelize.INTEGER,
      },
      acnt_status: {
        type: Sequelize.INTEGER,
      },
    },
    {
      timestamps: false,
      tableName: "horoscope_clients",
    }
  );

  return clients;
};
