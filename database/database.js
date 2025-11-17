const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false }
    }
  }
);

async function testar() {
  try {
    await sequelize.authenticate();
    console.log("Banco conectado com sucesso!");
  } catch (err) {
    console.log("Erro ao conectar com o banco:", err);
  }
}

testar();

module.exports = sequelize;
