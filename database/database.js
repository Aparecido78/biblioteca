const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false }
  }
});

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
