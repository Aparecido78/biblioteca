

const Livros = require("../livros/livros");
const sequelize = require("sequelize");
const connertar = require("../database/database");
const Usuario = require("../usuarios/banco_usuario");
const Emprestimo = require("../emprestimos/emprestimo");

const Interesse = connertar.define("Interesse", {
  
});


Interesse.belongsTo(Usuario, { foreignKey: "UsuarioId", as: "usuario" });
Usuario.hasMany(Interesse, { foreignKey: "UsuarioId", as: "interesses" });


Interesse.belongsTo(Livros, { foreignKey: "LivroId", as: "Livro" });
Livros.hasMany(Interesse, { foreignKey: "LivroId", as: "interesses" });



module.exports = Interesse;
