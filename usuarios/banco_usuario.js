const Sequelize = require("sequelize")
const connectar = require("../database/database")
const Usuario = connectar.define("Usuario",{
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    senha:{
        type:Sequelize.STRING,
        allowNull: false
    },
    foto:{
        type: Sequelize.STRING,
    }
})



module.exports = Usuario