const {Sequelize} = require("sequelize")
const connectar = require("../database/database")
const Categoria = connectar.define("Categoria",{
     
    nome:{
        type:Sequelize.STRING,
        allowNull: false
    }

})








module.exports = Categoria