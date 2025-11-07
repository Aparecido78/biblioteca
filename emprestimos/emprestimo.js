const sequelize = require("sequelize")
const connertar = require("../database/database")
const Usuario = require("../usuarios/banco_usuario")
const Livros = require("../livros/livros")

const Emprestimo = connertar.define("Emprestimo",{
    quantidade:{
        type: sequelize.INTEGER,
        allowNull: false,
    }
})
Emprestimo.belongsTo(Usuario)
Usuario.hasMany(Emprestimo)

Livros.hasMany(Emprestimo)
Emprestimo.belongsTo(Livros)


module.exports = Emprestimo

