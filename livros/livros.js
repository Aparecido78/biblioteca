const Sequelize = require("sequelize")
const connectar = require("../database/database")
const Categoria = require("../categoria/categoria")

const Livros = connectar.define("Livros",{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    autor:{
        type: Sequelize.STRING,
        allowNull: false
    },
    data:{
        type: Sequelize.DATE,
        allowNull:false
    },
    descricao:{
        type: Sequelize.STRING,
        allowNull: false
    },
    foto:{
        type: Sequelize.STRING,
        allowNull: false
    }

})

Livros.belongsTo(Categoria);   

Categoria.hasMany(Livros);      




module.exports = Livros







