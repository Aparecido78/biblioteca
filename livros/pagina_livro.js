const { Sequelize } = require("sequelize")
const conectar = require("../database/database")
const Livro = require("../livros/livros")


const Paginas = conectar.define("Paginas",{
    texto:{
        type:Sequelize.TEXT,
        allowNull: false
    }
})
Paginas.belongsTo(Livro)

Livro.hasMany(Paginas)



module.exports = Paginas













